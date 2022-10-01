import { useEffect, useState } from 'react';
import SearchInput from '../../Components/SearchInput';
import MovieList from '../../Components/Movies/MovieList';
import axios from '../../Components/Axios';

function Search() {
   const [input, setInput] = useState('');
   const [data, setData] = useState([]);

   useEffect(() => {
      axios
         .get('/movie/search', { params: { name: input, limit: 30 } })
         .then((res) => {
            setData(res.data);
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
