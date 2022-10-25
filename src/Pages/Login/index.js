import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Form from '~/Components/Form';
import axios from '~/Components/Axios';
import userSlice from '~/redux/userSlice';
import clientSlice from '~/redux/clientSlice';

function Login() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const data = {
      title: 'Đăng nhập',
      fields: [
         {
            type: 'text',
            placeholder: 'Tên đăng nhập',
            value: userName,
            onInput: (e) => {
               e.target.parentElement.lastChild.innerText = '';
               setUserName(e.target.value);
            },
            onBlur: (e) => {
               if (e.target.value.length < 6) {
                  e.target.parentElement.lastChild.innerText =
                     'Tối thiểu 6 kí tự';
               }
            },
         },
         {
            type: 'password',
            placeholder: 'Mật khẩu',
            value: password,
            onInput: (e) => {
               e.target.parentElement.lastChild.innerText = '';
               setPassword(e.target.value);
            },
            onBlur: (e) => {
               if (e.target.value.length < 6) {
                  e.target.parentElement.lastChild.innerText =
                     'Tối thiểu 6 kí tự';
               }
            },
         },
      ],
      submit: { name: 'Đăng nhập' },
      tick: { name: 'Ghi nhớ' },
      otherMethods: [
         {
            method: 'google',
            name: 'Đăng nhập với Google',
            onClick: () => {
               dispatch(
                  clientSlice.actions.addToastMessage({
                     type: 'warning',
                     message: 'Coming soon!',
                     id: uuid(),
                  }),
               );
            },
         },
      ],
      otherFeatures: [
         { name: 'Đăng ký', to: '/signup' },
         { name: 'Quên mật khẩu', to: '/forgot' },
      ],
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      if (userName.length >= 6 && password.length >= 6) {
         axios
            .get('/auth/signIn', {
               params: { userName, password },
               headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
               },
               withCredentials: 'include',
            })
            .then((res) => {
               const { user, refreshToken } = res.data;
               document.cookie = `refreshToken=Bearer ${refreshToken}`;
               dispatch(userSlice.actions.setUser(user));
               navigate('/');
            })
            .catch((err) => {
               dispatch(
                  clientSlice.actions.addToastMessage({
                     type: err.response.data.type,
                     message: err.response.data.message,
                     id: uuid(),
                  }),
               );
            });
      }
   };
   return (
      <div className={'container'}>
         <Form handleSubmit={handleSubmit} data={data} />
      </div>
   );
}

export default Login;
