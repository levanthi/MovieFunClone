import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Header from '../../Components/Header';

const cx = classNames.bind(styles);

function Home() {
   return (
      <div className={cx('home')}>
         <div>This is home page.</div>
      </div>
   );
}

export default Home;
