import React, {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './w3.css';
import AuthPage from "./pages/auth/AuthPage";
import Navigation from "./components/Natigation";
import MainPage from "./pages/MainPage";
import UserListPage from "./pages/users/UserListPage";
import UserInsertPage from "./pages/users/UserInsertPage";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import UpdateUserPage from "./pages/users/UpdateUserPage";
import RedirectPage from "./pages/auth/RedirectPage";
import {currentUser} from "./services/httpx.manager";

class App extends Component<any, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      accessToken: null
    };
  }

  async componentDidMount() {
    const activeSession = await currentUser();
    if (activeSession !== null) {
      this.setState({
        accessToken: activeSession.session_key,
      });
    }
  }

  render() {
    return (
        <Router>
          <div>
            {this.state.accessToken === null ? (
                <div>
                  <Route exact path="/" component={AuthPage}/>
                </div>
            ) : (
                <div>
                  <Navigation history={this.props.history} />
                  <Route exact path={"/"} component={MainPage}/>
                  <Route exact path={"/callback"} component={RedirectPage}/>
                  <Route exact path={"/users"} component={UserListPage}/>
                  <Route exact path={"/users/insert"} component={UserInsertPage}/>
                  <Route exact path={"/users/details/:id"} render={(props) => <UserDetailsPage {...props} /> } />
                  <Route exact path={"/users/update/:id"} render={(props) => <UpdateUserPage {...props} /> } />
                </div>
            )}
          </div>
        </Router>
    );
  }
}

export default App;
