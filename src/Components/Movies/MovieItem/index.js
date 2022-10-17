import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './movieItem.module.scss';
import Button from '../../Button';
import { images } from '../../../assets/images';

const cx = classNames.bind(styles);

function MovieItem({ data, list, className }) {
   return list ? (
      <div className={cx('movie-item', 'view-list')}>
         <Link to={`/tv/${data._id}`}>
            <img alt="thumbnail" src={data.thumbnail} />
         </Link>
         <div className={cx('content')}>
            <div className={cx('group')}>
               <Link to={`/tv/${data._id}`} className={cx('name')}>
                  {data.name}
               </Link>
               <span className={cx('duration')}>{data.duration}</span>
            </div>
            <div className={cx('group')}>
               <Link to={`/tv/${data._id}`} className={cx('sub-name')}>
                  {data.subName}
               </Link>
               <Link
                  to={`/filter/country/${data.country?.value}`}
                  className={cx('country')}
               >
                  {data.country?.name}
               </Link>
            </div>
            <p>{data.description}</p>
            <div className={cx('group')}>
               <div className={cx('genres')}>
                  {data.genres?.map((genre) => {
                     return (
                        <Button
                           key={genre.value}
                           to={`/filter/genres/${genre.value}`}
                           genreListView
                        >
                           {genre.name}
                        </Button>
                     );
                  })}
               </div>
               <div className={cx('rating-wrap')}>
                  <img src={images.IMDB} alt="imdb" />
                  <span className={cx('rating')}>{data.IMDB}</span>
               </div>
            </div>
         </div>
      </div>
   ) : (
      <div className={cx('movie-item', 'col m-4 l-2-4', className || 'c-6')}>
         <Link to={`/tv/${data._id}`}>
            <img alt="thumbnail" src={data.thumbnail} />
         </Link>
         <Link to={`/tv/${data._id}`} className={cx('name')}>
            {data.name}
         </Link>
         <Link to={`/tv/${data._id}`} className={cx('sub-name')}>
            {data.subName}
         </Link>
      </div>
   );
}

export default MovieItem;
