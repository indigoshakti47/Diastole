import React from "react";
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Router from './router';
import { store } from './store';
import ListBeneficiaries from "./pages/ListBeneficiaries";
import DetailedBeneficiarie from "./pages/DetailedBeneficiare";
import RequestCodeBeneficiarie from "./pages/RequestCodeBeneficiarie";

const App = () => {
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Router>
            <Route path="lista-beneficiarios" component={ListBeneficiaries}/>
            <Route path="detalles-beneficiarios/:idBeneficiario" component={DetailedBeneficiarie}/>
            <Route path="verificar-beneficiario/:idBeneficiario" component={RequestCodeBeneficiarie}/>
          </Router>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
