import axios from 'axios';
import { BACKEND_URL } from '~/variables';

const url = BACKEND_URL;

const instance = axios.create({
   baseURL: url,
});

const axiosJWT = axios.create({ baseURL: url });

export { axiosJWT };

export default instance;
