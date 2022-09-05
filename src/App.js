import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './Layouts';
import { publicRoutes, privateRoutes, PrivateRoutes } from './routes';

function App() {
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
