import Form from '../../Components/Form';

function Signup() {
   const data = {
      title: 'Đăng ký',
      fields: [
         { type: 'email', placeholder: 'Email' },
         { type: 'text', placeholder: 'Tên bạn' },
         { type: 'password', placeholder: 'Mật khẩu' },
      ],
      submit: { name: 'Đăng ký' },
      tick: {
         name: 'Đăng ký nhận thông báo về trang web',
         description: 'Chúng tôi chỉ gửi những thông báo quan trọng',
      },
      otherMethods: [{ method: 'google', name: 'Đăng nhập với Google' }],
      otherFeatures: [{ name: 'Đăng nhập', to: '/login' }],
   };
   return (
      <div className="container">
         <Form data={data} />
      </div>
   );
}

export default Signup;
