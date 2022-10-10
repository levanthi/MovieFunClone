import classNames from 'classnames/bind';
import styles from './loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
   return (
      <div className={cx('wrap')}>
         <div className={cx('loading')}></div>
      </div>
   );
}

export default Loading;
