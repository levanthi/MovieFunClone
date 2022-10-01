import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Filter from '../../Components/Filter';
import MovieList from '../../Components/Movies/MovieList';
import GroupOfFilm from '../../Components/GroupOfFilm';
import axios from '../../Components/Axios';

const cx = classNames.bind(styles);

function Home() {
   const [nominated, setNominated] = useState([]);
   const [show, setShow] = useState([]);
   const [movie, setMovie] = useState([]);

   useEffect(() => {
      axios.get('/movie/nominated').then((res) => {
         setNominated(res.data);
      });

      axios.get('/movie/home/show').then((res) => {
         setShow(res.data);
      });

      axios.get('/movie/home/movie').then((res) => {
         setMovie(res.data);
      });
   }, []);
   return (
      <div className={cx('home') + ' container'}>
         <Filter />

         <GroupOfFilm title="phim đề cử" />
         <MovieList movieList={nominated} />

         <GroupOfFilm title="phim lẻ mới cập nhật" to={'/filter/type/movie'} />
         <MovieList movieList={movie} />

         <GroupOfFilm title="phim bộ mới cập nhật" to={'/filter/type/show'} />
         <MovieList movieList={show} />
      </div>
   );
}

export default Home;
