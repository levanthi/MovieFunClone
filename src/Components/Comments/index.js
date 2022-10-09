import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { v4 as uuid } from 'uuid';
import styles from './comments.module.scss';
import { getUser } from '../../redux/selector';
import userSlice from '../../redux/userSlice';
import { refreshToken } from '../../redux/API/authApi';
import Button from '../Button';

const cx = classNames.bind(styles);

const ws = new WebSocket('ws://localhost:9000');
function Comments({ movieId }) {
   const dispatch = useDispatch();

   const [input, setInput] = useState('');
   const [comments, setComments] = useState([]);
   const [totalCommentsCount, setTotalCommentsCount] = useState(0);

   const user = useSelector(getUser);

   const axiosJWT = axios.create({ baseURL: 'http://localhost:8080' });
   axiosJWT.interceptors.request.use(
      async (config) => {
         let date = new Date();
         const decode = jwtDecode(user?.accessToken);
         if (decode.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = { ...user, accessToken: data.accessToken };
            document.cookie = `token=Bearer ${data.refreshToken}`;
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
         setInput('');
         ws.send(
            JSON.stringify({
               type: 'addComment',
               username: user.name,
               message: input,
               movieId,
               userId: user._id,
            }),
         );
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
            console.log(res.data);
            setComments((pre) => {
               return [...pre, ...res.data.data];
            });
            setTotalCommentsCount(res.data.totalCount[0].count);
         });
   };

   const handleDeleteComment = (commentId) => {
      axiosJWT
         .delete('/movie/comment', {
            params: { _id: commentId },
            headers: { authorization: `Bearer ${user.accessToken}` },
         })
         .then((res) => {
            if (res.status === 200) {
               ws.send(
                  JSON.stringify({
                     type: 'deleteComment',
                     _id: commentId,
                  }),
               );
            }
         });
   };

   useEffect(() => {
      // listen when comments is added
      const handleEventListener = function (e) {
         const res = JSON.parse(e.data);
         const { type, ...data } = res;
         if (type === 'addComment') {
            setComments((pre) => [data, ...pre]);
            setTotalCommentsCount((pre) => pre + 1);
         } else if (type === 'deleteComment') {
            setComments((pre) => pre.filter((p) => p._id !== res._id));
            setTotalCommentsCount((pre) => pre - 1);
         }
      };
      ws.addEventListener('message', handleEventListener);
      return () => {
         ws.removeEventListener('message', handleEventListener);
      };
   }, []);

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
               console.log(res.data);
               setComments(res.data.data);
               setTotalCommentsCount(res.data?.totalCount[0]?.count || 0);
            });
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
