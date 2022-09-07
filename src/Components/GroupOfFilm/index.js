import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './groupOfFilm.module.scss';

const cx = classNames.bind(styles);

function GroupOfFilm({ title = '', to }) {
   return (
      <div className={cx('group')}>
         <div className={cx('title')}>
            <span>{title}</span>
            {to && (
               <Link to={to} className={cx('view-all')}>
                  Xem tất cả
               </Link>
            )}
         </div>
         <span className={cx('separate')}></span>
      </div>
   );
}

export default GroupOfFilm;
