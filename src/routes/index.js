import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { TvLayout, WatchLayout } from '../Layouts';
import { getUser } from '../redux/selector';
import {
   Home,
   Search,
   Login,
   Signup,
   Profile,
   TopFilm,
   FilterPage,
   FAQ,
   Forgot,
   TV,
   Watch,
   Upload,
   Person,
   Collection,
} from '../Pages';

const PrivateRoutes = ({ children }) => {
   const isLogin = useSelector(getUser);
   if (isLogin) {
      return children;
   } else {
      return <Navigate to={'/login'} />;
   }
};

const publicRoutes = [
   {
      path: '/',
      component: Home,
   },
   {
      path: '/search',
      component: Search,
   },
   {
      path: '/top',
      component: TopFilm,
   },
   {
      path: '/login',
      component: Login,
   },
   {
      path: '/signup',
      component: Signup,
   },
   {
      path: '/forgot',
      component: Forgot,
   },
   {
      path: '/tv/*',
      component: TV,
      layout: TvLayout,
   },
   {
      path: '/watch/*',
      component: Watch,
      layout: WatchLayout,
   },
   {
      path: '/faq',
      component: FAQ,
   },
   {
      path: '/upload',
      component: Upload,
   },
   {
      path: '/person/*',
      component: Person,
   },
   {
      path: '/filter/*',
      component: FilterPage,
   },
];

const privateRoutes = (() => {
   return [
      {
         path: '/profile',
         component: Profile,
      },
      {
         path: '/collection',
         component: Collection,
      },
   ];
})();

export { publicRoutes, privateRoutes, PrivateRoutes };
