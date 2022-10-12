import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import styles from './tv.module.scss';
import Button from '../../Components/Button';
import { images } from '../../assets/images';
import Slide from '../../Components/Slide';
import Avatar from '../../Components/Avatar';
import TrailerThumbnail from '../../Components/TrailerThumbnail';
import axiosBase from '../../Components/Axios';
import axios from 'axios';
import { getUser } from '../../redux/selector';
import userSlice from '../../redux/userSlice';
import { refreshToken } from '../../redux/API/authApi';
import clientSlice from '../../redux/clientSlice';

const cx = classNames.bind(styles);

function TV() {
   const location = useLocation();
   const dispatch = useDispatch();
   const user = useSelector(getUser);
   const [data, setData] = useState({});

   const axiosJWT = axios.create({
      baseURL: 'http://localhost:8080',
   });

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

   const handleCollection = (id) => {
      const isCollected = data.isCollected;
      try {
         if (!isCollected) {
            axiosJWT
               .post(
                  '/user/collection',
                  { _id: user._id, movieId: id },
                  {
                     headers: { authorization: `Bearer ${user.accessToken}` },
                  },
               )
               .then((res) => {
                  const type = res.data.type;
                  const message = res.data.message;
                  setData((pre) => ({ ...pre, isCollected: true }));
                  dispatch(
                     clientSlice.actions.addToastMessage({
                        type,
                        message,
                        id: uuid(),
                     }),
                  );
               });
         } else {
            axiosJWT
               .delete('/user/collection', {
                  params: { movieId: id },
                  headers: { authorization: `Bearer ${user.accessToken}` },
               })
               .then((res) => {
                  const type = res.data.type;
                  const message = res.data.message;
                  setData((pre) => ({ ...pre, isCollected: false }));
                  dispatch(
                     clientSlice.actions.addToastMessage({
                        type,
                        message,
                        id: uuid(),
                     }),
                  );
               });
         }
      } catch (err) {}
   };

   useEffect(() => {
      const movieId = location.pathname.slice(
         location.pathname.lastIndexOf('/') + 1,
      );
      axiosBase
         .get(`/movie/${movieId}`, { params: { userId: user?._id } })
         .then(async (res) => {
            setData(res.data);
         });
   }, [location.pathname]);

   return (
      <div className={cx('tv')}>
         <span
            className={cx('background')}
            style={{ backgroundImage: `url(${data.background})` }}
         ></span>
         <div className={cx('row', 'body')}>
            <div className={cx('col l-3', 'tv-col')}>
               <img src={data.thumbnail} alt="thumbnail" />
               <Button to={`/watch/${data._id}`} danger large>
                  <FontAwesomeIcon icon={faPlay} />
                  Xem phim
               </Button>
            </div>

            <div className={cx('col l-9', 'tv-col-2')}>
               <h1 className={cx('title')}>{data.name}</h1>

               <h3 className={cx('sub-title')}>
                  {data.subName} (
                  <Link to={`/filter?year=${data.year}&currentPage=1`}>
                     {data.year}
                  </Link>
                  )
               </h3>

               <div className={cx('duration')}>
                  <b>
                     {data.duration
                        ? `${Math.floor(data.duration / 60)} giờ ${
                             data.duration % 60
                          } phút`
                        : ''}
                  </b>
               </div>

               <div className={cx('imbd')}>
                  <img src={images.IMDB} alt="imdb" />
                  <b>{data.IMDB}</b>
               </div>

               <div className={cx('share-genres')}>
                  <div className={cx('share')}>
                     <Button
                        href={'https://facebook.com/sharer/'}
                        target={'_blank'}
                        facebook
                        medium
                     >
                        <FontAwesomeIcon icon={faSquareFacebook} />
                        <span>Chia sẻ</span>
                     </Button>
                     <Button
                        onClick={() => {
                           handleCollection(data._id);
                        }}
                        collection
                        medium
                     >
                        <FontAwesomeIcon
                           icon={data.isCollected ? faTrash : faPlus}
                        />
                        <span>
                           {data.isCollected ? 'Gỡ sưu tập' : 'Bộ sưu tập'}
                        </span>
                     </Button>
                  </div>
                  <div className={cx('genres')}>
                     {data.genres?.map((genre) => {
                        return (
                           <Button
                              key={genre.value}
                              genre
                              to={`/filter?genres=${genre.value}&currentPage=1`}
                           >
                              {genre.name}
                           </Button>
                        );
                     })}
                  </div>
               </div>

               <div className={cx('info')}>
                  <div className={cx('item')}>
                     <span className={cx('title')}>Sáng lập</span>
                     <div className={cx('value')}>
                        {data.foundation?.map((item, index) => {
                           return (
                              <span key={item._id}>
                                 {index > 0 && <b>, </b>}
                                 <Link to={`/person/${item._id}`}>
                                    {item.name}
                                 </Link>
                              </span>
                           );
                        })}
                        {!!data.foundation?.length || 'N/A'}
                     </div>
                  </div>
                  <div className={cx('item')}>
                     <span className={cx('title')}>Quốc gia</span>
                     <div className={cx('value')}>
                        <Link
                           to={`/filter?country=${data.country?.value}&currentPage=1`}
                        >
                           {data.country?.name}
                        </Link>
                     </div>
                  </div>
                  <div className={cx('item')}>
                     <span className={cx('title')}>KHỞI CHIẾU</span>
                     <div className={cx('value')}>{data.premiere}</div>
                  </div>
               </div>

               <div className={cx('description')}>{data.description}</div>

               <Slide
                  data={{
                     title: 'Diễn viên',
                     Component: Avatar,
                     data: data.actors,
                  }}
               />

               <div className={'trailer'}>
                  <Slide
                     data={{
                        title: 'trailer',
                        Component: TrailerThumbnail,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        data: data.trailers,
                     }}
                  />
               </div>

               <div className={cx('season')}>
                  <div className={cx('title')}>season</div>
                  <div className={cx('body')}>
                     <img src={data.thumbnail} alt="thumbnail" />
                     <div className={cx('info')}>
                        <Link to={location.pathname}>Phần {data.season}</Link>
                        <p>
                           {data.year} - {data.episodes?.length} tập
                        </p>
                        <p>
                           Phần {data.season} của {data.name}&nbsp; được khởi
                           chiếu vào ngày {data.premiere}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default TV;
