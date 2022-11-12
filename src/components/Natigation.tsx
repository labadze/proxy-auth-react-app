import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {obtainAuthorizationUrl} from "../services/httpx.manager";

class Navigation extends Component<any, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            isOpened: false,
            navStyle: 'none',
            currentRoute: null,
            displayName: null,
        };
        this.logOut = this.logOut.bind(this);
        this.redirectToLoginResource = this.redirectToLoginResource.bind(this);
    }

    async componentDidMount() {
        if (this.state.currentRoute === null) {
            this.setState({currentRoute: window.location.pathname})
        }
        // try {
        //     const response = await fetch(
        //         `${process.env.REACT_APP_API_URL}/`,
        //         {
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        //             },
        //         }
        //     );
        //     const json = await response.json();
        //     if (response.status === 401 || response.status === 403) {
        //         this.logOut();
        //     } else {
        //         this.setState({
        //             displayName: json["data"]["first_name"]
        //         });
        //     }
        //     console.log(json);
        // } catch (error) {
        //     console.error(error);
        // }
    }

    openNav = async () => {
        if (this.state.navStyle === 'none') {
            this.setState({navStyle: 'block'})
        } else {
            this.setState({navStyle: 'none'})
        }
    };

    closeNav = async (route: any) => {
        this.setState({navStyle: 'none', currentRoute: route})
    };

    redirectToLoginResource = () => {
        obtainAuthorizationUrl().then((authorizationUrl: string | null) => {
            if (authorizationUrl === null) {
                alert("Server returned an error");
            }
            if (typeof authorizationUrl === "string") {
                window.location.href = authorizationUrl;
            }
        });

    }

    logOut = () => {
        localStorage.removeItem('access_token');
        // this.props.history.push('/');
        if (this.props.history) {
            this.props.history.push({
                pathname: "/",
                state: null
            });
        }
        // window.location.reload();
        window.location.href = "/"
    }

    render() {
        return (
            <div>
                <header>
                    <div className={"w3-top"}>
                        <div className="w3-bar w3-white w3-card">
                            <Link to={'/'} className={"w3-bar-item w3-button w3-wide w3-hide-medium"}>PROXY AUTH</Link>

                            <div className={"w3-right w3-hide-small w3-margin-top"}>
                                <strong className={"w3-bar-item w3-button"}>Hello {this.state.displayName}</strong>
                                <Link to={''} onClick={() => {
                                    this.setState({currentRoute: '/'})
                                }} className={"w3-bar-item w3-button"}>MAIN</Link>
                                <Link to={'/customers'} onClick={() => {
                                    this.setState({currentRoute: '/about'})
                                }} className={"w3-bar-item w3-button"}>CUSTOMERS</Link>
                                <Link to={'/users'} onClick={() => {
                                    this.setState({currentRoute: '/users'})
                                }} className={"w3-bar-item w3-button"}>USERS</Link>
                                <Link to={'/packages'} onClick={() => {
                                    this.setState({currentRoute: '/packages'})
                                }} className={"w3-bar-item w3-button"}>PACKAGES</Link>
                                <button onClick={() => {
                                    this.redirectToLoginResource()
                                }} className={"w3-bar-item w3-button"}> LOG IN</button>
                                <button onClick={this.logOut} className={"w3-bar-item w3-button"}> LOG OUT</button>
                            </div>

                            <div className={"w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium"}
                                 onClick={async () => {
                                     await this.openNav()
                                 }}>
                                <i className={"fa fa-bars"}>MENU</i>
                            </div>
                        </div>
                    </div>

                    <nav
                        className={"w3-sidebar w3-bar-block w3-black w3-card w3-animate-left w3-hide-medium w3-hide-large"}
                        style={{display: this.state.navStyle}}>
                        <div onClick={async () => {
                            await this.closeNav(null)
                        }}
                             className={"w3-bar-item w3-button w3-large w3-padding-16"}>Close ×
                        </div>
                        <Link to={''} onClick={async () => {
                            await this.closeNav('/')
                        }} className={"w3-bar-item w3-button"}>MAIN</Link>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Navigation;
