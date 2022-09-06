import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Filter from '../../Components/Filter';

const cx = classNames.bind(styles);

function Home() {
   return (
      <div className={cx('home')}>
         <Filter />
      </div>
   );
}

export default Home;
