import axios from '../../Components/Axios';

export async function refreshToken() {
   const res = axios.get('/auth/refresh-token', {
      withCredentials: true,
   });
   return (await res).data;
}
