import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './filter.module.scss';
import Filter from '../../Components/Filter';
import MovieList from '../../Components/Movies/MovieList';
import Pagination from '../../Components/Pagination';
import axios from '../../Components/Axios';

const cx = classNames.bind(styles);

function FilterPage() {
   const [viewList, setViewList] = useState(false);
   const [currentPage, setCurrentPage] = useState(5);
   const [data, setData] = useState([]);
   const [filterObj, setFilterObj] = useState({
      sort: 'updated',
   });
   useEffect(() => {
      axios.get('/movie/filter', { params: filterObj }).then((res) => {
         setData(res.data);
      });
   }, [filterObj]);
   return (
      <div className={cx('filter-page') + ' container'}>
         <h1 className={cx('title')}>Phim lẻ</h1>
         <Filter
            filterObj={filterObj}
            setFilterObj={setFilterObj}
            setViewList={setViewList}
            view
         />
         <MovieList movieList={data} list={viewList} />
         <Pagination
            page={20}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
         />
      </div>
   );
}

export default FilterPage;
