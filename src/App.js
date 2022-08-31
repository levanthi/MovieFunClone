import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, PrivateRoutes } from './routes';

function App() {
   return (
      <div className="App">
         <Routes>
            {privateRoutes.map((privateRoute, index) => {
               return (
                  <Route
                     path={privateRoute.path}
                     element={
                        <PrivateRoutes>
                           <privateRoute.component />
                        </PrivateRoutes>
                     }
                     key={index}
                  />
               );
            })}
            {publicRoutes.map((publicRoute, index) => {
               return (
                  <Route
                     path={publicRoute.path}
                     element={<publicRoute.component />}
                     key={index}
                  />
               );
            })}
         </Routes>
      </div>
   );
}

export default App;
