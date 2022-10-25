import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import socketIOClient from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import styles from './comments.module.scss';
import { getUser } from '../../redux/selector';
import userSlice from '../../redux/userSlice';
import clientSlice from '../../redux/clientSlice';
import { refreshToken } from '../../redux/API/authApi';
import Button from '../Button';
import { BACKEND_URL } from '~/variables';

const cx = classNames.bind(styles);

function Comments({ movieId }) {
   const dispatch = useDispatch();

   const [input, setInput] = useState('');
   const [comments, setComments] = useState([]);
   const [totalCommentsCount, setTotalCommentsCount] = useState(0);

   const socketRef = useRef();

   const user = useSelector(getUser);

   const axiosJWT = axios.create({ baseURL: BACKEND_URL });
   axiosJWT.interceptors.request.use(
      async (config) => {
         let date = new Date();
         const decode = jwtDecode(user?.accessToken);
         if (decode.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = { ...user, accessToken: data.accessToken };
            dispatch(userSlice.actions.setUser(refreshUser));
            config.headers = { authorization: `Bearer ${data.accessToken}` };
         }
         return config;
      },
      (err) => {
         return Promise.reject(err);
      },
   );

   const handleSendComment = () => {
      if (input) {
         const data = {
            username: user.name,
            message: input,
            movieId,
            userId: user._id,
         };
         axiosJWT
            .post('/movie/comment', data, {
               headers: { authorization: `Bearer ${user.accessToken}` },
            })
            .then((res) => {
               setInput('');
               socketRef.current.emit('sendDataClient', {
                  room: movieId,
                  data: {
                     type: 'addComment',
                     ...res.data.comment,
                  },
               });
            });
      }
   };

   const handleGetMoreComments = () => {
      axiosJWT
         .get(`/movie/comments`, {
            headers: { authorization: `Bearer ${user.accessToken}` },
            params: {
               movieId,
               limit: 5,
               skip: comments.length,
            },
         })
         .then((res) => {
            setComments((pre) => {
               return [...pre, ...res.data.data];
            });
            setTotalCommentsCount(res.data.totalCount);
         });
   };

   const handleDeleteComment = (commentId) => {
      axiosJWT
         .delete('/movie/comment', {
            params: { _id: commentId, userId: user._id },
            headers: { authorization: `Bearer ${user.accessToken}` },
         })
         .then((res) => {
            if (res.status === 200) {
               socketRef.current.emit('sendDataClient', {
                  room: movieId,
                  data: { _id: commentId, type: 'deleteComment' },
               });
               dispatch(
                  clientSlice.actions.addToastMessage({
                     type: 'success',
                     message: 'Xóa bình luận thành công.',
                     id: uuid(),
                  }),
               );
            }
         })
         .catch(() => {
            dispatch(
               clientSlice.actions.addToastMessage({
                  type: 'error',
                  message: 'Xóa bình luận thất bại.',
                  id: uuid(),
               }),
            );
         });
   };

   useEffect(() => {
      //API initial comments
      if (movieId) {
         axiosJWT
            .get(`/movie/comments`, {
               headers: { authorization: `Bearer ${user.accessToken}` },
               params: {
                  movieId,
               },
            })
            .then((res) => {
               setComments(res.data.data);
               setTotalCommentsCount(res.data?.totalCount || 0);
            });
      }

      //connect to socketIO
      if (movieId) {
         //Connect to socketIO
         socketRef.current = socketIOClient.connect(BACKEND_URL);
         //Subscribe room
         socketRef.current.emit('subscribe', movieId);
         //Receive data from socket server
         socketRef.current.on('sendDataServer', (dataGot) => {
            const { type, ...data } = dataGot;
            switch (type) {
               case 'addComment':
                  setComments((pre) => [data, ...pre]);
                  setTotalCommentsCount((pre) => pre + 1);
                  break;
               case 'deleteComment':
                  setComments((pre) =>
                     pre.filter((comment) => comment._id !== data._id),
                  );
                  setTotalCommentsCount((pre) => pre - 1);
                  break;
               default:
                  break;
            }
         });

         return () => {
            //Unsubscribe room
            socketRef.current.emit('unsubscribe', movieId);
         };
      }
   }, [movieId]);

   return (
      <div className={cx('comments')}>
         <div className={cx('header')}>
            <FontAwesomeIcon icon={faComments} />
            <span>Bình luận phim</span>
         </div>
         <div className={cx('input')}>
            <textarea
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Nhập bình luận..."
            />
            <button onClick={handleSendComment}>Gửi</button>
         </div>
         <div className={cx('display')}>
            {comments.map((comment) => {
               const date = new Date(comment.createdAt);
               return (
                  <div key={uuid()} className={cx('item')}>
                     <div className={cx('info')}>
                        <div className={cx('name')}>{comment.username}</div>
                        <div className={cx('date')}>
                           {`${
                              date?.getHours() > 9 ? '' : '0'
                           }${date?.getHours()}:${
                              date?.getMinutes() > 9 ? '' : '0'
                           }${date?.getMinutes()}\u00A0 ${date?.getDay()}/${
                              date?.getMonth() + 1
                           }/${date?.getFullYear()}`}
                        </div>
                        {user._id === comment.userId && (
                           <div
                              onClick={() => {
                                 handleDeleteComment(comment._id);
                              }}
                              className={cx('delete')}
                           >
                              <FontAwesomeIcon icon={faXmark} />
                           </div>
                        )}
                     </div>
                     <span>{comment.message}</span>
                  </div>
               );
            })}
         </div>

         {totalCommentsCount > comments.length && (
            <Button onClick={handleGetMoreComments} collection small>
               Xem thêm bình luận
            </Button>
         )}
      </div>
   );
}

export default Comments;
