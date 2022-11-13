import React, {Component} from 'react';
import {exchangeAuthorizationCode} from "../../services/httpx.manager";

class RedirectPage extends Component<any, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }
    async componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const sessionState = params.get('session_state');
        const code = params.get('code');
        if (code !== null && sessionState !== null) {
            const result = await exchangeAuthorizationCode(sessionState, code);
            if (result) {
                // this.props.history.push(`/packages/details/${this.props.match.params.id}`);
                this.props.history.push(`/`);
            }
        }
    }

    render() {
        return (
            <div style={{
                marginTop: '15%'
            }} className={'w3-center'}>
                <h1>Redirecting</h1>
            </div>
        );
    }
}

export default RedirectPage;
