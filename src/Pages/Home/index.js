import classNames from 'classnames/bind';
import styles from './home.module.scss';
import Filter from '../../Components/Filter';
import MovieList from '../../Components/Movies/MovieList';
import GroupOfFilm from '../../Components/GroupOfFilm';

const cx = classNames.bind(styles);

const movieList = [
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

function Home() {
   return (
      <div className={cx('home') + ' container'}>
         <Filter />

         <GroupOfFilm title="phim đề cử" />
         <MovieList movieList={movieList} />

         <GroupOfFilm title="phim lẻ mới cập nhật" to={'/something'} />
         <MovieList movieList={movieList.concat(movieList)} />

         <GroupOfFilm title="phim bộ mới cập nhật" to={'/something1'} />
         <MovieList movieList={movieList.concat(movieList)} />
      </div>
   );
}

export default Home;
