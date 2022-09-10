import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './header.module.scss';
import Button from '../Button';
import { images } from '../../assets/images';

const cx = classNames.bind(styles);

const linkList = [
   { to: '/search', children: 'Tìm kiếm' },
   { to: '/top', children: 'Phim Hot' },
   { to: '/type/movie', children: 'Phim Lẻ' },
   { to: '/type/show', children: 'Phim Bộ' },
   { to: '/newest', children: 'Phim Mới' },
   { to: '/faq', children: 'FAQ' },
];

function Header() {
   const headerRef = useRef();
   useEffect(() => {
      window.addEventListener('scroll', () => {
         if (window.scrollY >= 100) {
            headerRef.current.classList.add(cx('background'));
         } else {
            headerRef.current.classList.remove(cx('background'));
         }
      });
      return () => {
         headerRef.current.classList.remove(cx('background'));
      };
   }, []);
   console.log('render');
   return (
      <div ref={headerRef} className={cx('header')}>
         <Link to={'/'} className={cx('brand', 'item')}>
            <img src={images.logo} alt="logo" />
         </Link>
         <div className={cx('menu')}>
            <div className={cx('start')}>
               {linkList.map((item, index) => {
                  return (
                     <Button to={item.to} key={index} className={cx('item')}>
                        {index === 0 && (
                           <span className={cx('icon')}>
                              <FontAwesomeIcon icon={faMagnifyingGlass} />
                           </span>
                        )}
                        <span> {item.children}</span>
                     </Button>
                  );
               })}
            </div>
            <div className={cx('item')}>
               <Link to={'/login'} className={cx('end')}>
                  <Button medium primary>
                     Đăng Nhập
                  </Button>
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Header;
