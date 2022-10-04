import axios from '../../Components/Axios';

export async function refreshToken(user) {
   const { accessToken, ...newUser } = user;
   const res = axios.post('/auth/refresh-token', newUser, {
      withCredentials: true,
   });
   return (await res).data;
}
