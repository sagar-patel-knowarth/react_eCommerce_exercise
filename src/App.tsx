import React from 'react';
import AppHeader from './components/header/Header';
import { headerProps } from './constants/constants';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router/router';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AppFooter from './components/footer/footer';

function App() {
  return (
    <div className="content-wrapper">
        <Router>
          <AppHeader
            links={headerProps.links}
          />
          <Routes/>
          <AppFooter></AppFooter>
        </Router>
        <ToastContainer />
    </div>
  );
}

export default App;
