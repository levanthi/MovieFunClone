import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ page, currentPage = 1, setCurrentPage }) {
   const first = 1;
   const last = page === 1 ? null : page;
   const middle = (() => {
      if (page <= 2) return [];
      const result = [];
      let start = 0,
         end = page;
      // get Start
      if (currentPage >= page - 3) {
         start = end - 4;
      }
      if (start <= 1) {
         for (var i = currentPage - 2; i < end; i++) {
            if (i <= 1) {
               continue;
            } else {
               start = i;
               break;
            }
         }
      }
      //get End
      if (page <= 7 || start >= end - 4) {
         end = page - 1;
      } else if (currentPage < 4) {
         end = 5;
      } else {
         end = start + 4;
      }
      for (var j = start; j <= end; j++) {
         result.push(j);
      }
      return result;
   })();

   const handlePageChange = (data) => {
      if (data === 0 && currentPage < page) {
         setCurrentPage((pre) => pre + 1);
         window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (data === -1 && currentPage > 1) {
         setCurrentPage((pre) => pre - 1);
         window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (data !== currentPage && data > 0 && data <= last) {
         setCurrentPage(data);
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   return (
      page > 1 && (
         <div className={cx('pagination')}>
            <div className={cx('page')}>
               <Button
                  onClick={() => {
                     handlePageChange(first);
                  }}
                  paginationActive={currentPage === first}
                  pagination
               >
                  {first}
               </Button>
               {middle.map((btn, index) => {
                  let etc = <span className={cx('etc')}>...</span>;
                  let button = (
                     <Button
                        key={btn}
                        paginationActive={currentPage === btn}
                        pagination
                        onClick={() => {
                           handlePageChange(btn);
                        }}
                     >
                        {btn}
                     </Button>
                  );
                  if (index === 0 && btn >= 3) {
                     return (
                        <div className={cx('etc-wrap')} key={btn}>
                           {etc}
                           {button}
                        </div>
                     );
                  }
                  if (index === middle.length - 1 && btn < page - 1) {
                     return (
                        <div className={cx('etc-wrap')} key={btn}>
                           {button}
                           {etc}
                        </div>
                     );
                  }
                  return button;
               })}
               {page > 1 && (
                  <Button
                     onClick={() => {
                        handlePageChange(last);
                     }}
                     paginationActive={currentPage === last}
                     pagination
                  >
                     {last}
                  </Button>
               )}
            </div>
            <div className={cx('next-pre')}>
               <Button
                  onClick={() => {
                     handlePageChange(-1);
                  }}
                  pagination
               >
                  Trang trước
               </Button>
               <Button
                  onClick={() => {
                     handlePageChange(0);
                  }}
                  pagination
               >
                  Trang sau
               </Button>
            </div>
         </div>
      )
   );
}

export default Pagination;
