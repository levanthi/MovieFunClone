import axios from '../../Components/Axios';

export async function refreshToken() {
   console.log('REFRESH TOKEN');
   const res = await axios.get('/auth/refresh-token', {
      withCredentials: true,
   });
   return res.data;
}
