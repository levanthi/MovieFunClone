import axios from 'axios';

const url = 'http://localhost:8080';

const instance = axios.create({
   baseURL: url,
});

const axiosJWT = axios.create({ baseURL: url });

// const axiosJWT = axios.create({ baseURL: url });
// axiosJWT.interceptors.request.use(
//    async (config) => {
//       let date = new Date();
//       const decode = jwtDecode(user?.accessToken);
//       if (decode.exp < date.getTime() / 1000) {
//          const data = await refreshToken(user);
//          const refreshUser = { ...user, accessToken: data.accessToken };
//          document.cookie = `token=Bearer ${data.refreshToken}`;
//          dispatch(userSlice.actions.setUser(refreshUser));
//       }
//       return config;
//    },
//    (err) => {
//       return Promise.reject(err);
//    },
// );

export { axiosJWT };

export default instance;
