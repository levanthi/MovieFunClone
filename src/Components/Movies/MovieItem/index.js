import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './movieItem.module.scss';
import Button from '../../Button';
import { images } from '../../../assets/images';

const cx = classNames.bind(styles);

function MovieItem({ data, list, className }) {
   return list ? (
      <div className={cx('movie-item', 'view-list')}>
         <Link to={''}>
            <img alt="thumbnail" src={data.thumbnail} />
         </Link>
         <div className={cx('content')}>
            <div className={cx('group')}>
               <Link to="" className={cx('name')}>
                  {data.name}
               </Link>
               <span className={cx('duration')}>{data.duration}</span>
            </div>
            <div className={cx('group')}>
               <Link to={''} className={cx('raw-name')}>
                  {data.rawName}
               </Link>
               <Link to="" className={cx('country')}>
                  {data.country}
               </Link>
            </div>
            <p>{data.description}</p>
            <div className={cx('group')}>
               <div className={cx('genres')}>
                  {data.genres.map((genre) => {
                     return (
                        <Button key={genre} to={'/ss'} genreListView>
                           {genre}
                        </Button>
                     );
                  })}
               </div>
               <div className={cx('rating-wrap')}>
                  <img src={images.IMDB} alt="imdb" />
                  <span className={cx('rating')}>{data.rating}</span>
               </div>
            </div>
         </div>
      </div>
   ) : (
      <div className={cx('movie-item', 'col', className || 'l-2-4')}>
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
