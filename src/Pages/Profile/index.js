import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { getUser } from '../../redux/selector';
import styles from './profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
   const user = useSelector(getUser);

   const date = new Date(user.createdAt);
   return (
      <div className={cx('profile')}>
         <h1>{user.name}</h1>
         <div>
            Tên đăng nhập: <span>{user.userName}</span>
         </div>
         <div>
            Ngày gia nhập:{' '}
            <span>
               {`${date.getDate() > 9 ? '' : '0'}${date.getDate()}`}/
               {`${date.getMonth() > 8 ? '' : '0'}${date.getMonth() + 1}`}/
               {`${date.getFullYear()}  `}
               {`${date.getHours() > 9 ? '' : '0'}${date.getHours()}`}:
               {`${date.getMinutes() > 9 ? '' : '0'}${date.getMinutes()}`}
            </span>
         </div>
      </div>
   );
}

export default Profile;
