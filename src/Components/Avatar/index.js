import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ data }) {
   return (
      <div className={cx('avatar')}>
         <Link to={''}>
            <div
               className={cx('img')}
               style={{
                  backgroundImage: `url('${data.thumbnail}')`,
               }}
            ></div>
         </Link>
         <Link className={cx('name')} to={''}>
            {data.name}
         </Link>
         <span className={cx('sub-name')}>{data.subname}</span>
      </div>
   );
}

export default Avatar;
