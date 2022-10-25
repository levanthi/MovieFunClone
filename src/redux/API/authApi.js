import axios from '~/Components/Axios';

export async function refreshToken() {
   console.log('REFRESH TOKEN');
   let refToken = document.cookie.split(';').reduce((res, c) => {
      const [key, val] = c.trim().split('=').map(decodeURIComponent);
      try {
         return Object.assign(res, { [key]: JSON.parse(val) });
      } catch (e) {
         return Object.assign(res, { [key]: val });
      }
   }, {});
   const res = await axios.get('/auth/refresh-token', {
      withCredentials: true,
      params: {
         refreshToken: refToken.refreshToken,
      },
   });
   try {
      document.cookie = `refreshToken=Bearer ${res.data.refreshToken};path=/`;
   } catch (error) {
      console.log(error);
   }
   return res.data;
}
