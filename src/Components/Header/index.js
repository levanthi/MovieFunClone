import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faMagnifyingGlass,
   faCircleDollarToSlot,
   faFilm,
   faComment,
   faRightFromBracket,
   faSearch,
   faBars,
   faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { getUser, getOverlay } from '../../redux/selector';
import userSlice from '../../redux/userSlice';
import clientSlice from '~/redux/clientSlice';
import styles from './header.module.scss';
import Button from '../Button';
import { images } from '../../assets/images';
import { refreshToken } from '../../redux/API/authApi';

const cx = classNames.bind(styles);

const linkList = [
   { to: '/search', children: 'Tìm kiếm' },
   { to: '/top', children: 'Phim Hot' },
   { to: '/filter?type=movie&currentPage=1', children: 'Phim Lẻ' },
   { to: '/filter?type=show&currentPage=1', children: 'Phim Bộ' },
   { to: '/filter?=updated&currentPage=1', children: 'Phim Mới' },
   { to: '/faq', children: 'FAQ' },
];

function Header() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const headerRef = useRef();
   const sidebarRef = useRef();
   const user = useSelector(getUser);
   const overlay = useSelector(getOverlay);
   const [showSidebar, setShowSideBar] = useState(false);
   const dropDowns = [
      {
         name: 'Tài khoản',
         icon: faUser,
         to: '/profile',
      },
      {
         name: 'Donate',
         icon: faCircleDollarToSlot,
         to: '/donate',
      },
      {
         name: 'Bộ sưu tập',
         icon: faFilm,
         to: '/collection?page=1',
      },

      {
         name: 'Cập câu song ngữ',
         icon: faComment,
         to: '/pairs',
      },
      {
         name: 'Thoát',
         icon: faRightFromBracket,
         onClick: handleLogout,
      },
   ];

   const axiosJWT = axios.create({
      baseURL: 'http://localhost:8080',
   });
   axiosJWT.interceptors.request.use(
      async (config) => {
         let date = new Date();
         const decode = jwtDecode(user?.accessToken);
         if (decode.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = { ...user, accessToken: data.accessToken };
            document.cookie = `token=Bearer ${data.refreshToken}`;
            dispatch(userSlice.actions.setUser(refreshUser));
            config.headers = { authorization: `Bearer ${data.accessToken}` };
         }
         return config;
      },
      (err) => {
         return Promise.reject(err);
      },
   );

   function handleLogout() {
      axios
         .get('http://localhost:8080/auth/logout', {
            withCredentials: true,
         })
         .then((res) => {
            if (res.status === 200) {
               dispatch(userSlice.actions.setUser(null));
               dispatch(clientSlice.actions.toggleOverlay(false));
               navigate('/');
            }
         });
   }
   function handleShowSideBar() {
      dispatch(clientSlice.actions.toggleOverlay());
   }

   useEffect(() => {
      dispatch(clientSlice.actions.toggleOverlay(false));
   }, [location.pathname, location.search]);

   useEffect(() => {
      if (overlay) {
         setShowSideBar(true);
      } else {
         setShowSideBar(false);
      }
   }, [overlay]);

   useEffect(() => {
      if (showSidebar) {
         sidebarRef.current.style.transform = 'translateX(0)';
      } else {
         sidebarRef.current.style.transform = 'translateX(-100%)';
      }
   }, [showSidebar]);

   useEffect(() => {
      window.addEventListener('scroll', () => {
         if (window.scrollY >= 65) {
            headerRef.current?.classList.add(cx('background'));
         } else {
            headerRef.current?.classList.remove(cx('background'));
         }
      });
      return () => {
         headerRef.current?.classList.remove(cx('background'));
      };
   }, []);

   return (
      <>
         <div ref={headerRef} className={cx('header')}>
            <div
               onClick={handleShowSideBar}
               className={cx('l-0', 'm-0', 'item', 'bars')}
            >
               <FontAwesomeIcon icon={faBars} />
            </div>

            <Link to={'/'} className={cx('brand', 'item')}>
               <img src={images.logo} alt="logo" />
            </Link>
            <div className={cx('menu')}>
               <div className={cx('start', 'c-0')}>
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

               <div className={cx('end')}>
                  {user ? (
                     <div className={cx('name-group', 'c-0')}>
                        <div className={cx('name')}>{user.name}</div>
                        <div className={cx('drop-down')}>
                           {dropDowns.map((item, index) => {
                              return item.to ? (
                                 <Link key={index} to={item.to}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.name}</span>
                                 </Link>
                              ) : (
                                 <Button key={index} onClick={item.onClick}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.name}</span>
                                 </Button>
                              );
                           })}
                        </div>
                     </div>
                  ) : (
                     <div className={cx('item', 'c-0')}>
                        <Link to={'/login'}>
                           <Button medium primary>
                              Đăng Nhập
                           </Button>
                        </Link>
                     </div>
                  )}

                  {/* Search btn in mobile and tablet */}
                  <Link to={'/search'} className={cx('l-0', 'm-0', 'item')}>
                     <FontAwesomeIcon icon={faSearch} />
                     <span>Tìm kiếm</span>
                  </Link>
               </div>
            </div>
         </div>

         <div ref={sidebarRef} className={cx('side-bar', 'l-0', 'm-0')}>
            {user ? (
               <>
                  <div>
                     <FontAwesomeIcon icon={faCircleUser} />
                     {user.name}
                  </div>
                  {dropDowns.map((item, index) => {
                     return item.to ? (
                        <Link key={index} to={item.to}>
                           <FontAwesomeIcon icon={item.icon} />
                           <span>{item.name}</span>
                        </Link>
                     ) : (
                        <Button key={index} onClick={item.onClick}>
                           <FontAwesomeIcon icon={item.icon} />
                           <span>{item.name}</span>
                        </Button>
                     );
                  })}
               </>
            ) : (
               <>
                  <Link to={'/login'} className={cx('mobile-login')}>
                     <Button medium primary>
                        Đăng Nhập
                     </Button>
                  </Link>
                  <Link to={'/signup'}>Đăng Ký</Link>
               </>
            )}

            <span className={cx('separate')}></span>
            <Link to={'/top'}>Phim Hot</Link>
            <Link to={'/filter?type=movie&currentPage=1'}>Phim lẻ</Link>
            <Link to={'/filter?type=show&currentPage=1'}>Phim Bộ</Link>
            <Link to={'/filter?=updated&currentPage=1'}>Phim Mới</Link>
            <Link to={'/faq'}>FAQ</Link>
         </div>
      </>
   );
}

export default Header;
