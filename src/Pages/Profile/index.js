import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { getUser } from '~/redux/selector';
import styles from './profile.module.scss';
import Button from '~/Components/Button';
import clientSlice from '~/redux/clientSlice';
import userSlice from '~/redux/userSlice';
import { refreshToken } from '~/redux/API/authApi';

const cx = classNames.bind(styles);

function Profile() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector(getUser);
   const date = new Date(user.createdAt);
   const [changePassword, setChangePassword] = useState(false);
   const [newPassword, setNewPassword] = useState('');
   const [retypeNewPassword, setRetypeNewPassword] = useState('');
   const [password, setPassword] = useState('');

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

   const handleTogglePassword = () => {
      setChangePassword((pre) => !pre);
   };
   const handleSubmit = () => {
      console.log('submit');
      if (newPassword !== retypeNewPassword) {
         dispatch(
            clientSlice.actions.addToastMessage({
               type: 'error',
               message: 'Mật khẩu mới không trùng khớp',
               id: uuid(),
            }),
         );
         return;
      }
      axiosJWT
         .patch('/user/change-password', { newPassword, password })
         .then((res) => {
            dispatch(
               clientSlice.actions.addToastMessage({
                  type: res.data.type,
                  message: res.data.message,
                  id: uuid(),
               }),
               navigate('/'),
            );
         })
         .catch(() => {
            dispatch(
               clientSlice.actions.addToastMessage({
                  type: 'error',
                  message: 'Mật khẩu không chính xác',
                  id: uuid(),
               }),
            );
         });
   };

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
         <div className={cx('password')}>
            {changePassword ? (
               <div className={cx('inputs')}>
                  <input
                     type="password"
                     placeholder="Mật khẩu cũ"
                     onChange={(e) => {
                        setPassword(e.target.value);
                     }}
                  />
                  <input
                     type="password"
                     placeholder="Mật khẩu mới"
                     onChange={(e) => {
                        setNewPassword(e.target.value);
                     }}
                  />
                  <input
                     type="password"
                     placeholder="Nhập lại mật khẩu mới"
                     onChange={(e) => {
                        setRetypeNewPassword(e.target.value);
                     }}
                  />
                  <div>
                     <Button medium episode onClick={handleSubmit}>
                        Cập nhật
                     </Button>
                     <Button medium danger onClick={handleTogglePassword}>
                        Hủy
                     </Button>
                  </div>
               </div>
            ) : (
               <span className="link" onClick={handleTogglePassword}>
                  Đổi mật khẩu
               </span>
            )}
         </div>
      </div>
   );
}

export default Profile;
