import Form from '../../Components/Form';

function Forgot() {
   const data = {
      title: 'Lấy lại mật khẩu',
      fields: [{ type: 'email', placeholder: 'Email đăng ký' }],
      submit: {
         name: 'Gửi',
      },
   };
   return (
      <div className="container">
         <Form data={data} />
      </div>
   );
}

export default Forgot;
