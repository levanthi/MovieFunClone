import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from '../../Components/Form';
import axios from '../../Components/Axios';

function Signup() {
   const navigate = useNavigate();
   const [userName, setUserName] = useState('');
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');

   //    return {
   //       title: 'Đăng ký',
   //       fields: [
   //          {
   //             type: 'text',
   //             placeholder: 'Tên đăng nhập',
   //             value: userName,
   //             onInput: (e) => {
   //                setUserName(e.target.value);
   //             },
   //          },
   //          {
   //             type: 'text',
   //             placeholder: 'Tên bạn',
   //             value: name,
   //             onInput: (e) => {
   //                setName(e.target.value);
   //             },
   //          },
   //          {
   //             type: 'password',
   //             placeholder: 'Mật khẩu',
   //             value: password,
   //             onInput: (e) => {
   //                setPassword(e.target.value);
   //             },
   //          },
   //       ],
   //       submit: { name: 'Đăng ký' },
   //       tick: {
   //          name: 'Đăng ký nhận thông báo về trang web',
   //          description: 'Chúng tôi chỉ gửi những thông báo quan trọng',
   //       },
   //       otherMethods: [{ method: 'google', name: 'Đăng nhập với Google' }],
   //       otherFeatures: [{ name: 'Đăng nhập', to: '/login' }],
   //    };
   // }, []);
   const data = {
      title: 'Đăng ký',
      fields: [
         {
            type: 'text',
            placeholder: 'Tên đăng nhập',
            value: userName,
            onInput: (e) => {
               e.target.parentElement.lastChild.innerText = '';
               setUserName(e.target.value.replaceAll(' ', ''));
            },
            onBlur: (e) => {
               if (e.target.value.length < 6) {
                  e.target.parentElement.lastChild.innerText =
                     'Tối thiểu 6 kí tự';
               }
            },
         },
         {
            type: 'text',
            placeholder: 'Tên bạn',
            value: name,
            onInput: (e) => {
               setName(e.target.value);
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
      submit: { name: 'Đăng ký' },
      tick: {
         name: 'Đăng ký nhận thông báo về trang web',
         description: 'Chúng tôi chỉ gửi những thông báo quan trọng',
      },
      otherMethods: [{ method: 'google', name: 'Đăng nhập với Google' }],
      otherFeatures: [{ name: 'Đăng nhập', to: '/login' }],
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (userName.length < 6 || password.length < 6) return;
      axios.post('/auth/signUp', { userName, name, password }).then((res) => {
         if (res.data.type === 'exist') {
            alert('User exist! please choose another user name');
         } else if (res.data.type === 'success') {
            alert('Create user successfully! please login.');
            navigate('/login');
         }
      });
   };

   return (
      <div className="container">
         <Form handleSubmit={handleSubmit} data={data} />
      </div>
   );
}

export default Signup;
