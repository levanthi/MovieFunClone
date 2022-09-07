import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './movieItem.module.scss';

const cx = classNames.bind(styles);

function MovieItem({ data }) {
   return (
      <div className={cx('movie-item') + ' col l-2-4'}>
         <Link to="">
            <img alt="thumbnail" src={data.thumbnail} />
         </Link>
         <Link to="" className={cx('name')}>
            {data.name}
         </Link>
         <Link to="" className={cx('raw-name')}>
            {data.rawName}
         </Link>
      </div>
   );
}

export default MovieItem;
