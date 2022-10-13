import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './filter.module.scss';
import Filter from '~/Components/Filter';
import MovieList from '~/Components/Movies/MovieList';
import Pagination from '~/Components/Pagination';
import axios from '~/Components/Axios';
import clientSlice from '~/redux/clientSlice';

const cx = classNames.bind(styles);

function FilterPage() {
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const [pageCount, setPageCount] = useState(1);
   const [viewList, setViewList] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [data, setData] = useState([]);
   const firstTime = useRef(true);

   useEffect(() => {
      const params = Object.fromEntries(new URLSearchParams(location.search));

      //normal flow ( pagination(1,2,3...) change )
      if (firstTime.current) {
         firstTime.current = false;
      } else {
         if (currentPage !== Number(params.currentPage)) {
            params.currentPage = currentPage;
            navigate({
               pathname: '/filter',
               search: `?${new URLSearchParams(params).toString()}`,
            });
         }
      }
   }, [currentPage]);

   useEffect(() => {
      const params = Object.fromEntries(new URLSearchParams(location.search));
      //backward page
      if (Number(params.currentPage) !== currentPage) {
         setCurrentPage(Number(params.currentPage));
      }

      //CAll API
      dispatch(clientSlice.actions.startLoading());
      axios.get('/movie/filter', { params: params }).then((res) => {
         setData(res.data.data);
         setPageCount(res.data.pageCount);
         dispatch(clientSlice.actions.endLoading());
      });
   }, [location.search]);

   const handleFilter = (e) => {
      const params = Object.fromEntries(new URLSearchParams(location.search));
      params[e.target.name] = e.target.value;
      if (e.target.value === '') {
         delete params[e.target.name];
      }
      navigate({
         pathname: '/filter',
         search: `?${new URLSearchParams(params).toString()}`,
      });
   };

   return (
      <div className={cx('filter-page') + ' container'}>
         <Filter setViewList={setViewList} handleFilter={handleFilter} view />
         <MovieList movieList={data} list={viewList} />
         <Pagination
            page={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
         />
      </div>
   );
}

export default FilterPage;
