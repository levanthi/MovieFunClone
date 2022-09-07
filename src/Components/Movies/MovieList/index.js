import classNames from 'classnames/bind';
import styles from './movieList.module.scss';
import MovieItem from '../MovieItem';

const cx = classNames.bind(styles);

function MovieList({ movieList = [] }) {
   return (
      <div className={cx('movie-list') + ' row'}>
         {movieList.map((movie, index) => {
            return <MovieItem key={index} data={movie} />;
         })}
      </div>
   );
}

export default MovieList;
