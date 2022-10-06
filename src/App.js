import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DefaultLayout } from './Layouts';
import { publicRoutes, privateRoutes, PrivateRoutes } from './routes';
import { getOverlay } from './redux/selector';
import Overlay from './Components/Overlay';
import ToastMessage from './Components/ToastMessage';
import { getToastMessage } from './redux/selector';

function App() {
   const location = useLocation();
   const toastMessage = useSelector(getToastMessage) || [];
   const showOverlay = useSelector(getOverlay);
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
   }, [location?.pathname]);
   return (
      <div className="App">
         {toastMessage.map((toast) => {
            return (
               <ToastMessage
                  key={toast.id}
                  id={toast.id}
                  type={toast.type}
                  timerId={toast.timerId}
                  message={toast.message}
               />
            );
         })}
         {showOverlay && <Overlay />}
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
