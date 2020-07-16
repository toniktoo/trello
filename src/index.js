import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import App from './App';
import { store } from './redux/store';
import { rrfProps } from './firebase';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  rootElement
);
