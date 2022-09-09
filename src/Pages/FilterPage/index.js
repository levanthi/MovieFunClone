import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './filter.module.scss';
import Filter from '../../Components/Filter';
import MovieList from '../../Components/Movies/MovieList';

const cx = classNames.bind(styles);

function FilterPage() {
   const [viewList, setViewList] = useState(false);
   return (
      <div className={cx('filter-page') + ' container'}>
         <h1 className={cx('title')}>Phim lẻ</h1>
         <Filter setViewList={setViewList} view />
         <MovieList list={viewList} />
      </div>
   );
}

export default FilterPage;
