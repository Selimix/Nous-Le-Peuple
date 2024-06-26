import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ValidateUsers from './components/Admin/ValidateUsers';
import Stats from './components/Admin/Stats';
import ManageUsers from './components/Admin/ManageUsers';
import UserStats from './components/UserStats';
import UserRanking from './components/UserRanking';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/admin/validate-users" component={ValidateUsers} />
          <Route path="/admin/stats" component={Stats} />
          <Route path="/admin/manage-users" component={ManageUsers} />
          <Route path="/user/stats" component={UserStats} />
          <Route path="/user/ranking" component={UserRanking} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
