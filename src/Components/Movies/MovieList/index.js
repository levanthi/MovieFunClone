import classNames from 'classnames/bind';
import styles from './movieList.module.scss';
import MovieItem from '../MovieItem';

const cx = classNames.bind(styles);

const testData = [
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
   },
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
   },
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
   },
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
   },
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
   },
];

function MovieList({ movieList = testData || [] }) {
   return (
      <div className={cx('movie-list') + ' row'}>
         {movieList.map((movie, index) => {
            return <MovieItem key={index} data={movie} />;
         })}
      </div>
   );
}

export default MovieList;
