import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import GlobalStyle from './Components/GlobalStyle';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      {/* <React.StrictMode> */}
      <Router>
         <GlobalStyle>
            <App />
         </GlobalStyle>
      </Router>
      {/* </React.StrictMode> */}
   </Provider>,
);
reportWebVitals();
