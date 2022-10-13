import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from '~/App';
import GlobalStyle from '~/Components/GlobalStyle';
import reportWebVitals from '~/reportWebVitals';
import { store, persistor } from '~/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <Router>
            <GlobalStyle>
               <App />
            </GlobalStyle>
         </Router>
      </PersistGate>
   </Provider>,
);
reportWebVitals();
