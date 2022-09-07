import SearchInput from '../../Components/SearchInput';
import MovieList from '../../Components/Movies/MovieList';

function Search() {
   return (
      <div className={'container'}>
         <SearchInput />
         <MovieList />
      </div>
   );
}

export default Search;
