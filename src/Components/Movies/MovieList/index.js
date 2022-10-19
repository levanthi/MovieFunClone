import classNames from 'classnames/bind';
import styles from './movieList.module.scss';
import MovieItem from '../MovieItem';

const cx = classNames.bind(styles);

function MovieList({ movieList = [], list, className }) {
   return (
      <div className={cx('movie-list', 'row')}>
         {Array.isArray(movieList) &&
            movieList.map((movie, index) => {
               return (
                  <MovieItem
                     className={className}
                     key={index}
                     data={movie}
                     list={list}
                  />
               );
            })}
      </div>
   );
}

export default MovieList;
