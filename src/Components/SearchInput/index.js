import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import styles from './searchInput.module.scss';

const cx = classNames.bind(styles);

function SearchInput({ setInput, input }) {
   const searchRef = useRef();
   const handleSearchChange = (e) => {
      setInput(e.target.value);
   };
   useEffect(() => {
      searchRef.current?.focus();
   }, []);
   return (
      <div className={cx('search-input')}>
         <input
            ref={searchRef}
            spellCheck={false}
            value={input}
            placeholder="Nhập tên phim..."
            onChange={handleSearchChange}
         />
         {input && (
            <div className={cx('search-by-google')}>
               Nếu không thấy phim cần tìm, hãy thử{' '}
               <a
                  href={`https://www.google.com/search?q=${input}%20site%3Axemphim.fun`}
                  target={'_blank'}
                  rel="noreferrer"
               >
                  tìm với Google
               </a>
            </div>
         )}
      </div>
   );
}

export default SearchInput;
