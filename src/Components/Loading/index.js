import classNames from 'classnames/bind';
import styles from './loading.module.scss';

const cx = classNames.bind(styles);

function Loading({ absolute }) {
   return (
      <div className={cx('wrap', { absolute })}>
         <div className={cx('loading')}></div>
      </div>
   );
}

export default Loading;
