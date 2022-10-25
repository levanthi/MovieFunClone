import axios from '~/Components/Axios';

export async function refreshToken() {
   console.log('REFRESH TOKEN');
   const res = await axios.get('/auth/refresh-token', {
      withCredentials: true,
   });
   try {
      document.cookie = `refreshToken=Bearer ${res.data.refreshToken}`;
   } catch (error) {
      console.log(error);
   }
   return res.data;
}
