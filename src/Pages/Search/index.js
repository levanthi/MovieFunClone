import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import SearchInput from '../../Components/SearchInput';
import MovieList from '../../Components/Movies/MovieList';
import axios from '../../Components/Axios';
import clientSelector from '../../redux/clientSlice';

function Search() {
   const dispatch = useDispatch();
   const [input, setInput] = useState('');
   const [data, setData] = useState([]);

   useEffect(() => {
      dispatch(clientSelector.actions.startLoading());
      axios
         .get('/movie/search', { params: { name: input, limit: 30 } })
         .then((res) => {
            setData(res.data);
            dispatch(clientSelector.actions.endLoading());
         });
   }, [input]);

   return (
      <div className={'container'}>
         <SearchInput input={input} setInput={setInput} />
         <MovieList movieList={data} />
      </div>
   );
}

export default Search;
