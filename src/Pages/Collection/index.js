import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import MovieList from '~/Components/Movies/MovieList';
import Pagination from '~/Components/Pagination';
import axios from 'axios';
import { refreshToken } from '~/redux/API/authApi';
import { getUser } from '~/redux/selector';
import userSlice from '~/redux/userSlice';
import clientSlice from '~/redux/clientSlice';

function Collection() {
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [currentPage, setCurrentPage] = useState(1);
   const [pageCount, setPageCount] = useState(1);
   const [movies, setMovies] = useState([]);

   const firstTime = useRef(true);

   const user = useSelector(getUser);

   const axiosJWT = axios.create({ baseURL: 'http://localhost:8080' });
   axiosJWT.interceptors.request.use(
      async (config) => {
         let date = new Date();
         const decode = jwtDecode(user?.accessToken);
         if (decode.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = { ...user, accessToken: data.accessToken };
            document.cookie = `token=Bearer ${data.refreshToken}`;
            dispatch(userSlice.actions.setUser(refreshUser));
            config.headers = { authorization: `Bearer ${data.accessToken}` };
         }
         return config;
      },
      (err) => {
         return Promise.reject(err);
      },
   );

   useEffect(() => {
      const params = Object.fromEntries(new URLSearchParams(location.search));
      let pageAPI = currentPage;

      //Backward
      if (Number(params.page) !== currentPage) {
         pageAPI = +params.page;
         setCurrentPage(Number(params.page));
      }

      //API
      dispatch(clientSlice.actions.startLoading());
      axiosJWT
         .get('/user/collection', {
            params: {
               userId: user._id,
               currentPage: pageAPI,
               limit: 4,
            },
            headers: { authorization: `Bearer ${user.accessToken}` },
         })
         .then((res) => {
            setMovies(res.data.collections);
            setPageCount(res.data.page);
            dispatch(clientSlice.actions.endLoading());
         });
   }, [location.search]);

   useEffect(() => {
      if (firstTime.current) {
         firstTime.current = false;
         return;
      }
      const params = Object.fromEntries(new URLSearchParams(location.search));

      if (Number(params.page) !== currentPage) {
         navigate({
            pathname: '/collection',
            search: `?page=${currentPage}`,
         });
      }
   }, [currentPage]);

   return (
      <div>
         <MovieList movieList={movies} />
         <Pagination
            page={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
         />
      </div>
   );
}

export default Collection;
