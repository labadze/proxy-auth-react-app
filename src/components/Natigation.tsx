import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    obtainAuthorizationUrl,
    obtainLogoutUrl,
    terminateSession
} from "../services/httpx.manager";

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
        // TODO: fetch current user
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

    redirectToLoginResource = async (): Promise<void> => {
        const urlResult = await obtainAuthorizationUrl();
        if (urlResult === null) {
            alert("Server returned an error");
        }
        if (typeof urlResult === "string") {
            window.location.href = urlResult;
        }
    }

    logOut = async () => {
        const logOutUrl = await obtainLogoutUrl();
        if (logOutUrl === null) {
            alert("Server returned an error");
        }
        if (typeof logOutUrl === "string") {
            // window.location.href = `${logOutUrl}?client_id=fapy&post_logout_redirect_uri=${encodeURIComponent(`http://localhost:3000`)}`
            window.location.href = `${logOutUrl}?redirect_uri=${encodeURIComponent(`http://localhost:3000`)}`
            // await terminateSession(logOutUrl);
        }
        // this.props.history.push('/');
        // if (this.props.history) {
        //     this.props.history.push({
        //         pathname: "/",
        //         state: null
        //     });
        // }
        // window.location.reload();
        // window.location.href = `${logOutUrl}/${encodeURIComponent(`http://localhost:3000`)}`
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
                                <Link to={'/users'} onClick={() => {
                                    this.setState({currentRoute: '/users'})
                                }} className={"w3-bar-item w3-button"}>USERS</Link>
                                <Link to={'/roles'} onClick={() => {
                                    this.setState({currentRoute: '/roles'})
                                }} className={"w3-bar-item w3-button"}>ROLES</Link>
                                <button onClick={ this.redirectToLoginResource} className={"w3-bar-item w3-button"}> LOG IN</button>
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
