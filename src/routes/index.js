import { Navigate } from 'react-router-dom';
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
