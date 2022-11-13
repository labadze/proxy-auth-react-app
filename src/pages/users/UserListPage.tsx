import React, {Component} from 'react';
import {Link} from "react-router-dom";

class UserListPage extends Component<any, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchBy: null,
            users: [],
            showDialog: false,
            payload: null,
            searchTerm: '',
            isLoading: false,
            isProgress: false,
        };
        this.handleChangeSearchBy = this.handleChangeSearchBy.bind(this);
        this.handleSearchTerm = this.handleSearchTerm.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this.findValueOnServer = this.findValueOnServer.bind(this);
    }

    async componentDidMount() {
        this.setState({
            isProgress: true,
        });
        await this.progressBar();
    }

    closeDialog = () => {
        this.setState({
            showDialog: false,
        });
    }

    async componentWillUnmount() {

    }

    handleChangeSearchBy = (radioButtonEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (radioButtonEvent.target !== null) {
            this.setState({
                searchBy: radioButtonEvent.target.value
            });
        }
    }

    changeRadioValueByLabel = (value: string) => {
        this.setState({
            searchBy: value
        });
    }

    handleSearchTerm = (inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (inputEvent.target !== null) {
            this.setState({
                searchTerm: inputEvent.target.value.trim()
            });
        }
    }

    findValueOnServer = async () => {
        this.setState({
            isLoading: true,
        });
    }

    _handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            console.log('do validate');
        }
    }

    progressBar = async () => {
        let elem = document.getElementById("myBar");
        let width = 20;
        let id = setInterval(frame, 10);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                if (elem !== null) {
                    elem.style.width = width + '%';
                    elem.innerHTML = width * 1 + '%';
                }
            }
        }
    }

    render() {
        return (
            <div className={'w3-margin-top w3-padding-top-64'}>
                {this.state.isLoading ? (
                    <div className={'w3-display-middle'}>
                        <h4 className={'w3-center'}>PLEASE WAIT ...</h4>
                        <div className={"loader"}/>
                    </div>
                ) : (
                    <div>
                        <div className={'w3-container'}>
                            <div className={'w3-row'}>
                                <div className={"w3-container w3-card-4 w3-rest"}>
                                    <h4>DEFINE SEARCH CONDITION</h4>
                                    <p>
                                        <Link to={'/users/insert'}
                                              className={"w3-btn w3-blue-gray w3-small w3-margin w3-padding w3-right"}>INSERT
                                            NEW USER</Link>
                                    </p>
                                    <p>
                                        <input className={"w3-radio"} type={"radio"} name={"search_by"}
                                               value={'phone_number'}
                                               checked={this.state.searchBy === 'phone_number'}
                                               onChange={this.handleChangeSearchBy}/>
                                        <label onClick={() => this.changeRadioValueByLabel('phone_number')}>PHONE
                                            NUMBER</label>
                                    </p>
                                    <p>
                                        <input className={"w3-radio"} type={"radio"} name={"search_by"}
                                               value={'pid'}
                                               checked={this.state.searchBy === 'pid'}
                                               onChange={this.handleChangeSearchBy}/>
                                        <label onClick={() => this.changeRadioValueByLabel('pid')}>PID</label></p>
                                    <p>
                                        <input className={"w3-input w3-border w3-animate-input"}
                                               type={"text"}
                                               onChange={this.handleSearchTerm}
                                               placeholder={'Query...'}
                                               onKeyDown={async (e) => {
                                                   if (e.code === "Enter") {
                                                       // e.preventDefault();
                                                       await this.findValueOnServer()
                                                   }
                                               }}
                                               style={{width: '70%'}}/>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={'w3-container w3-margin-top w3-padding-top-64'}>
                            <div className={"w3-light-grey"} style={{
                                display: this.state.isProgress ? 'block' : 'none'
                            }}>
                                <h4 className={'w3-center'}>PLEASE WAIT ...</h4>
                                <div id={"myBar"} className={"w3-container w3-blue-gray w3-center"} style={{
                                    width: '20%'
                                }}>20%</div>
                            </div>
                            {this.state.users !== null && this.state.users.length > 0 ? (
                                <div className={'w3-row'}>
                                    <table className={"w3-table-all w3-hoverable"}>
                                        <thead>
                                        <tr className={"w3-light-grey"}>
                                            <th>First And Last Name</th>
                                            <th>Phone number</th>
                                            <th>PID</th>
                                            <th>ACCESS LEVEL</th>
                                            <th>...</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.users.map((val: any, key: any) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.first_name} {val.last_name}</td>
                                                    <td>{val.phone_number}</td>
                                                    <td>{val.pid}</td>
                                                    <td>{val.user_role}</td>
                                                    <td><Link to={`/users/details/${val.id}`}>View Details</Link></td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className={'w3-row'}>
                                    <p className={'w3-center'} style={{
                                        display: this.state.isProgress ? 'none' : 'block'
                                    }}>No users found in system</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default UserListPage;

