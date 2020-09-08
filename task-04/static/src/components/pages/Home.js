import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Documents from '../documents/Documents';
import Navbar from '../layout/Navbar';
import Managers from '../managers/Managers';

const Home = () => {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Redirect exact from='/' to='/documents' />
            <Route exact path='/documents' component={Documents} />
            <Route exact path='/managers' component={Managers} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
};

export default Home;
