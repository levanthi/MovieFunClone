import Form from '../../Components/Form';

function Login() {
   const data = {
      title: 'Đăng nhập',
      fields: [
         { type: 'email', placeholder: 'Email' },
         { type: 'password', placeholder: 'Mật khẩu' },
      ],
      submit: { name: 'Đăng nhập' },
      tick: { name: 'Ghi nhớ' },
      otherMethods: [{ method: 'google', name: 'Đăng nhập với Google' }],
      otherFeatures: [
         { name: 'Đăng ký', to: '/signup' },
         { name: 'Quên mật khẩu', to: '/forgot' },
      ],
   };
   return (
      <div className={'container'}>
         <Form data={data} />
      </div>
   );
}

export default Login;
