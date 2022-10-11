import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ data }) {
   return (
      <div className={cx('avatar')}>
         <Link to={`/person/${data._id}`}>
            <div
               className={cx('img')}
               style={{
                  backgroundImage: `url('${data.thumbnail}')`,
               }}
            ></div>
         </Link>
         <Link className={cx('name')} to={`/person/${data._id}`}>
            {data.name}
         </Link>
      </div>
   );
}

export default Avatar;
