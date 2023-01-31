import React, { Component } from 'react';
// import logo from './logo.svg';
import './styles/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AuthService from "../src/services/auth.service";
import Login from './pages/auth/Login';
import Singup from './pages/auth/Singup';
import Dashboard from './pages/dashboard/Dashboard';
import AddTopic from './pages/topic/add/AddTopic';
import TopicList from './pages/topic/list/TopicList';
import AddAds from './pages/event/add/AddAds';
import EditAds from './pages/event/edit/EditAds';
import AdsList from './pages/event/list/AdsList';
import AddUser from './pages/user/add/AddUser';
import UserList from './pages/user/list/UserList';
import ErrorPage from './pages/ErrorPage';

class App extends Component {
  

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/singup" component={Singup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/add-topic" component={AddTopic} />
          <Route path="/topic-list" component={TopicList} />
          <Route path="/add-event" component={AddAds} />
          <Route path="/edit-event/:id"  component={EditAds} />
          <Route path="/event-list" component={AdsList} />
          <Route path="/add-user" component={AddUser} />
          <Route path="/user-list" component={UserList} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}
 
export default App;
