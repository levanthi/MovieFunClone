import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Filter from '../../Components/Filter';
import MovieList from '../../Components/Movies/MovieList';
const cx = classNames.bind(styles);

function Home() {
   return (
      <div className={cx('home')}>
         <Filter />
         <MovieList />
      </div>
   );
}

export default Home;
