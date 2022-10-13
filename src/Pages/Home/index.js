import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import styles from './home.module.scss';
import Filter from '~/Components/Filter';
import MovieList from '~/Components/Movies/MovieList';
import GroupOfFilm from '~/Components/GroupOfFilm';
import axios from '~/Components/Axios';
import clientSlice from '~/redux/clientSlice';

const cx = classNames.bind(styles);

function Home() {
   const dispatch = useDispatch();
   const [nominated, setNominated] = useState([]);
   const [show, setShow] = useState([]);
   const [movie, setMovie] = useState([]);

   useEffect(() => {
      dispatch(clientSlice.actions.startLoading());
      const nominated = axios.get('/movie/nominated').then((res) => {
         setNominated(res.data);
      });

      const show = axios.get('/movie/home/show').then((res) => {
         setShow(res.data);
      });

      const movie = axios.get('/movie/home/movie').then((res) => {
         setMovie(res.data);
      });
      Promise.all([nominated, show, movie]).then(() => {
         dispatch(clientSlice.actions.endLoading());
      });
   }, []);
   return (
      <div className={cx('home') + ' container'}>
         <Filter />

         <GroupOfFilm title="phim đề cử" />
         <MovieList movieList={nominated} />

         <GroupOfFilm
            title="phim lẻ mới cập nhật"
            to={'/filter?type=movie&currentPage=1'}
         />
         <MovieList movieList={movie} />

         <GroupOfFilm
            title="phim bộ mới cập nhật"
            to={'/filter?type=show&currentPage=1'}
         />
         <MovieList movieList={show} />
      </div>
   );
}

export default Home;
