import React, {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './w3.css';
import Navigation from "./components/Natigation";
import MainPage from "./pages/MainPage";
import UserListPage from "./pages/users/UserListPage";
import UserInsertPage from "./pages/users/UserInsertPage";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import UpdateUserPage from "./pages/users/UpdateUserPage";
import RedirectPage from "./pages/auth/RedirectPage";
import ItemListPage from "./pages/items/ItemListPage";

class App extends Component<any, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      accessToken: null
    };
  }

  async componentDidMount() {
  }

  render() {
    return (
        <Router>
          <div>
            <div>
              <Navigation history={this.props.history} />
              <Route exact path={"/"} component={MainPage}/>
              <Route exact path={"/callback"} component={RedirectPage}/>
              <Route exact path={"/items"} component={ItemListPage}/>
              <Route exact path={"/users"} component={UserListPage}/>
              <Route exact path={"/users/insert"} component={UserInsertPage}/>
              <Route exact path={"/users/details/:id"} render={(props) => <UserDetailsPage {...props} /> } />
              <Route exact path={"/users/update/:id"} render={(props) => <UpdateUserPage {...props} /> } />
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
