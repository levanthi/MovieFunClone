import { Navigate } from 'react-router-dom';
import { TvLayout, WatchLayout } from '../Layouts';
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
} from '../Pages';
const isLogin = false;

const PrivateRoutes = ({ children }) => {
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
      path: '*',
      component: FilterPage,
   },
];

const privateRoutes = (() => {
   return [
      {
         path: '/profile',
         component: Profile,
      },
   ];
})();

export { publicRoutes, privateRoutes, PrivateRoutes };
