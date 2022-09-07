import classNames from 'classnames/bind';
import styles from './topFilm.module.scss';
import TabUI from '../../Components/TabUI';
import MovieList from '../../Components/Movies/MovieList';

const cx = classNames.bind(styles);

function TopMovie() {
   return (
      <div className={cx('top-film') + ' container'}>
         <h1 className={cx('title')}>Top phim được xem nhiều nhất</h1>
         <TabUI />
         <MovieList />
      </div>
   );
}

export default TopMovie;
