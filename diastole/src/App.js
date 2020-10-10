import React from "react";
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Router from './router';
import { store } from './store';

const App = () => {
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
