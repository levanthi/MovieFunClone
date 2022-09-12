import { Fragment, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DefaultLayout } from './Layouts';
import { publicRoutes, privateRoutes, PrivateRoutes } from './routes';

function App() {
   const location = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }, [location.pathname]);
   return (
      <div className="App">
         <Routes>
            {privateRoutes.map((route, index) => {
               let Layout = DefaultLayout;
               const Page = route.component;
               if (route.layout === null) {
                  Layout = Fragment;
               } else if (route.layout) {
                  Layout = route.layout;
               }
               return (
                  <Route
                     path={route.path}
                     element={
                        <PrivateRoutes>
                           <Layout>
                              <Page />
                           </Layout>
                        </PrivateRoutes>
                     }
                     key={index}
                  />
               );
            })}
            {publicRoutes.map((route, index) => {
               let Layout = DefaultLayout;
               const Page = route.component;
               if (route.layout === null) {
                  Layout = Fragment;
               } else if (route.layout) {
                  Layout = route.layout;
               }
               return (
                  <Route
                     path={route.path}
                     element={
                        <Layout>
                           <Page />
                        </Layout>
                     }
                     key={index}
                  />
               );
            })}
         </Routes>
      </div>
   );
}

export default App;
