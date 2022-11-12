import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class UserDetailsPage extends Component<any, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            userData: null
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/private/manage/users/${this.props.match.params.id}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                }
            );
            const json = await response.json();
            this.setState({
                userData: json["data"]
            })
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className={'w3-margin-top w3-padding-top-64'}>
                <div className={'w3-row w3-container w3-display-container'}>
                    <div className={'w3-col w3-card-4 w3-rest w3-margin'}>
                        {this.state.userData !== null ? (
                            <div className={"w3-container"}>
                                <ul className={"w3-ul"}>
                                    <li>SYSTEM ID: {this.state.userData.id}</li>
                                    <li>FIRST NAME: {this.state.userData.first_name}</li>
                                    <li>LAST NAME: {this.state.userData.last_name}</li>
                                    <li>PID: {this.state.userData.pid}</li>
                                    <li>PHONE NUMBER: {this.state.userData.phone_number}</li>
                                    <li>EMAIL: {this.state.userData.electric_mail}</li>
                                    <li>ACCESS LEVEL: {this.state.userData.user_role}</li>
                                    <li>
                                        <div className={'w3-margin w3-padding'}>
                                            <button className={"w3-btn w3-blue-gray w3-border-white w3-right w3-margin-bottom"} onClick={() => {
                                                this.props.history.push(`/users/update/${this.props.match.params.id}`, { data: this.state.userData });
                                            }}>EDIT USER</button>
                                            <Link
                                                className={"w3-btn w3-blue-gray w3-border-white w3-right w3-margin-bottom w3-margin-right"}
                                                to={'/users'}>BACK</Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        ) : null}

                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetailsPage;
