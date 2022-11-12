import React, {Component} from 'react';

// import {Redirect} from "react-router-dom";

class AuthPage extends Component<any, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            identifier: null,
            password: null,
            authMode: null,
            credentials: null,
            identifierErrorMessage: null,
            passwordErrorMessage: null,
            errorMessage: null,
            accessToken: null,
            isLoading: false,
        };
        this.handleIdentifierInput = this.handleIdentifierInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.retrieveJWT = this.retrieveJWT.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    _handleKeyDown = async (e: any) => {
        if (e.key === 'Enter') {
            if (this.state.identifier !== null && this.state.password !== null) {
                await this.retrieveJWT()
            }
        }
    }

    async componentDidMount() {
        const jwt = localStorage.getItem('access_token');
        if (jwt !== null) {
            this.props.history.push('/');
        }
    }

    retrieveJWT = async () => {
        if (this.state.identifier !== null && this.state.password !== null) {
            this.setState({
                isLoading: true,
            });
            const encodedCredentials = btoa(JSON.stringify({
                identifier: this.state.identifier,
                password: this.state.password
            })).toString();
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/public/auth/user?auth_mode=${this.state.authMode}`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            credentials: encodedCredentials,
                        }),
                    }
                );
                const json = await response.json();
                this.setState({
                    isLoading: false,
                });
                if (response.status === 200) {
                    localStorage.setItem('access_token', json['data']['access_token']);
                    window.location.reload();
                    // return <Redirect to={'/'} />
                } else {
                    if (json.message === null) {
                        this.setState({
                            errorMessage: json["error"]
                        });
                    } else {
                        this.setState({
                            errorMessage: json["message"]
                        });
                    }
                }
            } catch (error) {
                console.error(error);
                this.setState({
                    errorMessage: "Fetch wont work..."
                });
            }
        }
    }

    clearErrors = () => {
        this.setState({
            identifierErrorMessage: null,
            passwordErrorMessage: null,
            errorMessage: null,
        });
    }

    detectIdentifierType = (value: string) => {
        const valueToCheck = value.toLowerCase().trim();
        // @ts-nocheck
        const re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
        if (re.test(valueToCheck)) {
            this.setState({
                authMode: 'email'
            });
        } else if (!isNaN(Number(valueToCheck)) && !isNaN(parseFloat(valueToCheck))) {
            this.setState({
                authMode: 'phone'
            });
        } else {
            this.setState({
                identifierErrorMessage: 'Provided username is not Email nor Phone.'
            });
        }
    }

    handleIdentifierInput = (inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.clearErrors();
        if (inputEvent.target !== null) {
            this.setState({
                identifier: inputEvent.target.value
            });
            this.detectIdentifierType(inputEvent.target.value);
        }
    }

    handlePasswordInput = (inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.clearErrors();
        if (inputEvent.target !== null) {
            this.setState({
                password: inputEvent.target.value
            });
        }
    }


    render() {
        return (
            <div onKeyDown={this._handleKeyDown}>
                <div className={"w3-card-4 w3-content w3-sand"} style={{
                    marginTop: '10%'
                }}>
                    <div className={"w3-container w3-blue-grey"} style={{
                        display: this.state.isLoading ? 'none' : 'block'
                    }}>
                        <h2 className={'w3-center'}>Authorization</h2>
                    </div>
                    <div className={"w3-container"}>
                        {this.state.errorMessage !== null ? (
                            <p style={{color: '#d94848'}}>{this.state.errorMessage}</p>
                        ) : null}
                        {this.state.isLoading ? (
                            <div className={'w3-display-middle'}>
                                <h4 className={'w3-center'}>PLEASE WAIT ...</h4>
                                <div className={"loader"}/>
                            </div>
                        ) : (
                            <div>
                                <div className={'w3-margin w3-padding'}>
                                    <label className={"w3-text-blue-gray"}><b>Email or username</b></label>
                                    <input className={"w3-input w3-border w3-white"}
                                           onChange={this.handleIdentifierInput}
                                           type={"text"} required={true}/>
                                    {this.state.identifierErrorMessage !== null ? (
                                        <strong>{this.state.identifierErrorMessage}</strong>
                                    ) : null}
                                </div>
                                <div className={'w3-margin w3-padding'}>
                                    <label className={"w3-text-blue-gray"}><b>Password</b></label>
                                    <input className={"w3-input w3-border w3-white"}
                                           onChange={this.handlePasswordInput}
                                           type={"password"} required={true}/>
                                </div>
                                <div className={'w3-margin w3-padding'}>
                                    <button className={"w3-btn w3-blue-gray w3-border-white"}
                                            onClick={this.retrieveJWT}>Authenticate
                                    </button>
                                    {/*<button className={"w3-button w3-light-gray w3-border-white w3-right"} style={{ textDecoration: 'underline'}}>Recover password</button>*/}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthPage;
