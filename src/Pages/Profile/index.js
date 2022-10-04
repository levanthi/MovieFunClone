import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames/bind';
import jwtDecode from 'jwt-decode';
import { getUser } from '../../redux/selector';
import { refreshToken } from '../../redux/API/authApi';
import userSlice from '../../redux/userSlice';
import styles from './profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
   const user = useSelector(getUser);
   const dispatch = useDispatch();
   const axiosJWT = axios.create({ baseURL: 'http://localhost:8080' });
   axiosJWT.interceptors.request.use(
      async (config) => {
         let date = new Date();
         const decode = jwtDecode(user?.accessToken);
         if (decode.exp < date.getTime() / 1000) {
            const data = await refreshToken(user);
            const refreshUser = { ...user, accessToken: data.accessToken };
            document.cookie = `token=Bearer ${data.refreshToken}`;
            dispatch(userSlice.actions.setUser(refreshUser));
         }
         return config;
      },
      (err) => {
         return Promise.reject(err);
      },
   );
   const date = new Date(user.createdAt);
   return (
      <div className={cx('profile')}>
         <h1>{user.name}</h1>
         <div>
            Tên đăng nhập: <span>{user.userName}</span>
         </div>
         <div>
            Ngày gia nhập:{' '}
            <span>
               {`${date.getDate() > 9 ? '' : '0'}${date.getDate()}`}/
               {`${date.getMonth() > 8 ? '' : '0'}${date.getMonth() + 1}`}/
               {`${date.getFullYear()}  `}
               {`${date.getHours() > 9 ? '' : '0'}${date.getHours()}`}:
               {`${date.getMinutes() > 9 ? '' : '0'}${date.getMinutes()}`}
            </span>
         </div>
      </div>
   );
}

export default Profile;
