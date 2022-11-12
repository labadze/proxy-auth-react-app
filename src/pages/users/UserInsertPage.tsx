import React, {Component} from 'react';
import {Link} from "react-router-dom";

class UserInsertPage extends Component<any, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            pid: '',
            phoneNumber: '',
            electricMail: '',
            accessLevel: '',
        };
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setPID = this.setPID.bind(this);
        this.setPhoneNumber = this.setPhoneNumber.bind(this);
        this.sendDataToServer = this.sendDataToServer.bind(this);
        this.setElectricMail = this.setElectricMail.bind(this);
    }

    async componentDidMount() {

    }

    setFirstName = (inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.clearErrors();
        if (inputEvent.target !== null) {
            this.setState({
                firstName: inputEvent.target.value //.trim()
            });
        }
    }

    setLastName = (inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.clearErrors();
        if (inputEvent.target !== null) {
            this.setState({
                lastName: parseFloat(inputEvent.target.value)
            });
        }
    }

    setPID = (inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.clearErrors();
        if (inputEvent.target !== null) {
            this.setState({
                pid: inputEvent.target.value
            });
        }
    }

    setPhoneNumber = (inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.clearErrors();
        if (inputEvent.target !== null) {
            this.setState({
                phoneNumber: Number(inputEvent.target.value.trim())
            });
        }
    }

    setElectricMail = (inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.clearErrors();
        if (inputEvent.target !== null) {
            this.setState({
                electricMail: inputEvent.target.value.toLowerCase().trim()
            });
        }
    }

    clearErrors = () => {
        this.setState({
            errorMessage: null,
        });
    }

    sendDataToServer = async () => {
        if (this.state.errorMessage === null) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/private/manage/users`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        },
                        body: JSON.stringify({
                            first_name: this.state.firstName,
                            last_name: this.state.lastName,
                            pid: this.state.pid,
                            phone_number: this.state.phoneNumber,
                            electric_mail: this.state.electricMail,
                        }),
                    }
                );
                const json = await response.json();
                if (response.status === 200) {
                    console.log(json);
                    // return <Redirect to={'/'} />
                    this.props.history.push(`/users/details/${this.props.match.params.id}`);
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

    render() {
        return (
            <div className={'w3-margin-top w3-padding-top-64'}>
                <div className={'w3-container'}>
                    <div className={'w3-margin w3-padding'}>
                        {this.state.errorMessage !== null ? (
                            <p>{this.state.errorMessage}</p>
                        ): null}
                    </div>
                    <div className={'w3-margin w3-padding'}>
                        <label className={"w3-text-dark-gray"}>
                            <b>FIRST NAME</b>
                        </label>
                        <input className={"w3-input w3-border w3-white"}
                               onChange={this.setFirstName}
                               value={this.state.firstName}
                               type={"text"} required={true}/>
                    </div>
                    <div className={'w3-margin w3-padding'}>
                        <label className={"w3-text-dark-gray"}>
                            <b>LAST NAME</b>
                        </label>
                        <input className={"w3-input w3-border w3-white"}
                               onChange={this.setLastName}
                               value={this.state.lastName}
                               type={"text"} required={true}/>
                    </div>
                    <div className={'w3-margin w3-padding'}>
                        <label className={"w3-text-dark-gray"}>
                            <b>PID</b>
                        </label>
                        <input className={"w3-input w3-border w3-white"}
                               onChange={this.setPID}
                               value={this.state.pid}
                               type={"text"} required={true}/>
                    </div>
                    <div className={'w3-margin w3-padding'}>
                        <label className={"w3-text-dark-gray"}>
                            <b>PHONE NUMBER</b>
                        </label>
                        <input className={"w3-input w3-border w3-white"}
                               onChange={this.setPhoneNumber}
                               value={this.state.phoneNumber}
                               type={"text"} required={true}/>
                    </div>
                    <div className={'w3-margin w3-padding'}>
                        <label className={"w3-text-dark-gray"}>
                            <b>EMAIL</b>
                        </label>
                        <input className={"w3-input w3-border w3-white"}
                               onChange={this.setElectricMail}
                               value={this.state.electricMail}
                               type={"email"} required={true}/>
                    </div>
                    <div className={'w3-margin w3-padding'}>
                        <button className={"w3-btn w3-blue-gray w3-border-white"} onClick={this.sendDataToServer}>INSERT USER</button>
                        <Link
                            className={"w3-btn w3-blue-gray w3-border-white w3-right w3-margin-bottom w3-margin-right"}
                            to={`/users/`}>BACK</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInsertPage;
