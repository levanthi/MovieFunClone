import { Navigate } from 'react-router-dom';
import { Home, Search, Login, Profile } from '../Pages';
import { DefaultLayout } from '../Layouts';
const isLogin = true;

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
      path: '/login',
      component: Login,
   },
   {
      path: '*',
      component: Home,
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
