import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './movieItem.module.scss';
import Button from '~/Components/Button';
import { images } from '~/assets/images';

const cx = classNames.bind(styles);

function MovieItem({ data, list, className }) {
   const [isMobile, setIsMobile] = useState(
      window.innerWidth < 800 ? true : false,
   );
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 800) {
            setIsMobile(true);
         } else {
            setIsMobile(false);
         }
      };
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);
   return list ? (
      <div className={cx('movie-item', 'view-list')}>
         <Link to={`/tv/${data._id}`}>
            <img alt="thumbnail" src={data.thumbnail} />
         </Link>
         <div className={cx('content', { mobile: isMobile })}>
            {!isMobile ? (
               <>
                  <div className={cx('group')}>
                     <Link to={`/tv/${data._id}`} className={cx('name')}>
                        {data.name}
                     </Link>
                     <span className={cx('duration')}>
                        {data.duration} phút
                     </span>
                  </div>
                  <div className={cx('group')}>
                     <Link to={`/tv/${data._id}`} className={cx('sub-name')}>
                        {data.subName}
                     </Link>
                     <Link
                        to={`/filter?year=${data.year}&currentPage=1`}
                        className={cx('year')}
                     >
                        ({data.year})
                     </Link>
                     <Link
                        to={`/filter?country=${data.country?.value}&currentPage=1`}
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
               </>
            ) : (
               <>
                  <Link to={`/tv/${data._id}`} className={cx('name')}>
                     {data.name}
                  </Link>

                  <div className={cx('group')}>
                     <Link to={`/tv/${data._id}`} className={cx('sub-name')}>
                        {data.subName}
                     </Link>
                     <Link
                        to={`/filter?year=${data._id}currentPage=1`}
                        className={cx('year')}
                     >
                        ({data.year})
                     </Link>
                  </div>
                  {data.duration && (
                     <span className={cx('duration')}>
                        {data.duration} phút
                     </span>
                  )}
                  <Link
                     to={`/filter?country=${data.country?.value}&currentPage=1`}
                     className={cx('country')}
                  >
                     {data.country?.name}
                  </Link>
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
               </>
            )}
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
