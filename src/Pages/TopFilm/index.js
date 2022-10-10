import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './topFilm.module.scss';
import TabUI from '../../Components/TabUI';
import MovieList from '../../Components/Movies/MovieList';
import axios from '../../Components/Axios';
import clientSlice from '../../redux/clientSlice';

const cx = classNames.bind(styles);

const tabData = [
   { title: 'ngày', data: 'day' },
   { title: 'tuần', data: 'week' },
   { title: 'tháng', data: 'month' },
];

function TopMovie() {
   const dispatch = useDispatch();
   const [data, setData] = useState([]);
   const [tabActive, setTabActive] = useState(0);
   useEffect(() => {
      dispatch(clientSlice.actions.startLoading());
      axios.get('/movie/top', { params: { limit: 30 } }).then((res) => {
         setData(res.data);
         dispatch(clientSlice.actions.endLoading());
      });
   }, []);
   return (
      <div className={cx('top-film') + ' container'}>
         <h1 className={cx('title')}>Top phim được xem nhiều nhất</h1>
         <TabUI
            tabData={tabData}
            tabActive={tabActive}
            setTabActive={setTabActive}
         />
         <MovieList movieList={data[tabActive]} />
      </div>
   );
}

export default TopMovie;
