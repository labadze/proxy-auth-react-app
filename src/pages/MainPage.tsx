import React, {Component} from 'react';
import {Link} from "react-router-dom";

// import {Redirect, Route} from "react-router-dom";

class MainPage extends Component<any, { [key: string]: any }> {
    // ws = new WebSocket(`wss://attendance-mgr.herokuapp.com/ws`)
    // ws = new WebSocket(`ws://127.0.0.1:8000/ws`)
    constructor(props: any) {
        super(props);
        this.state = {
            pagination: null,
            totalItemCount: 0,
            skip: 0,
            limit: 0,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            customerVisits: [],
            payload: null,
            showDialog: false,
            isLoading: false,
        };
        this.closeDialog = this.closeDialog.bind(this);
    }

    closeDialog = () => {
        this.setState({
            showDialog: false,
        });
    }

    async componentDidMount() {
        // this.ws.onopen = () => {
        //     // on connecting, do nothing but log it to the console
        //     console.log('connected V latest 0.0.1')
        // }


        // this.ws.onmessage = (evt: MessageEvent) => {
        //     // listen to data sent from the websocket server
        //     const message = JSON.parse(evt.data)
        //     console.log(message);
        //     // this.setState({dataFromServer: message})
        //     this.setState({
        //         showDialog: true,
        //         payload: message.payload,
        //     });
        //     setTimeout(() => {
        //         this.closeDialog();
        //         window.location.reload();
        //     }, 6000);
        //     // console.log(message)
        //
        // }
        // this.ws.onclose = () => {
        //     console.log('disconnected')
        //     window.location.reload();
        //     // automatically try to reconnect on connection loss
        // }
        this.setState({
            isLoading: true,
        });
        await this.progressBar();
        await this.loadTodayAttends();
        // const jwt = localStorage.getItem('access_token');
        const paginationResult = await this.generatePagination(0, 2, 10);
        this.setState({
            pagination: paginationResult
        });
    }

    loadTodayAttends = async () => {
        // try {
        //     const response = await fetch(
        //         `${process.env.REACT_APP_API_URL}/protected/today_attends`,
        //         {
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        //             },
        //         }
        //     );
        //     const json = await response.json();
        //     // console.log(json);
        //     this.setState({
        //         customerVisits: json['data'],
        //         isLoading: false
        //     })
        // } catch (error) {
        //     console.error(error);
        // }
    }

    async componentWillUnmount() {
        // this.ws.onclose = () => {
        //     console.log('disconnected')
        //     // automatically try to reconnect on connection loss
        // }
    }

    generatePagination = async (skip: number, limit: number, _total: number) => {
        const paginationItems = this.state.items.map((i: any) => <button key={i}
                                                                         className={`w3-button ${i === skip + 1 ? 'w3-green' : 'w3-white'}`}>{i}</button>);
        return <div className={"w3-bar w3-center w3-margin"}>
            <button className={"w3-button"}>«</button>
            {/*<button className={"w3-button w3-green"}>1</button>*/}
            {paginationItems.slice(skip, limit)}
            <button className={"w3-button"}>»</button>
        </div>;
    }

    logOut = () => {
        localStorage.removeItem('access_token');
        // this.props.history.push('/auth');
        window.location.reload();
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
                    elem.innerHTML = width * 1  + '%';
                }
            }
        }
    }

    render() {
        return (
            <div className={'w3-container w3-margin-top w3-padding-top-64'}>
                <div className={"w3-modal"} style={{
                    display: this.state.showDialog === true ? 'block' : 'none'
                }}>
                    <div className={"w3-modal-content w3-animate-top w3-card-4"}>
                        <header className={`w3-container ${this.state.payload !== null && this.state.payload['days_left'] <= 3 ? 'w3-red' : 'w3-blue-gray'}`}>
                            <span onClick={this.closeDialog} className={"w3-button w3-display-topright"}>&times;</span>
                            <h2>NEW ATTEND DETECTED</h2>
                        </header>
                        {this.state.payload !== null ? (
                            <div className={"w3-container"}>
                                {/*biometry_identifier_path*/}
                                <p>FULL NAME: {this.state.payload['first_name']} {this.state.payload['last_name']}</p>
                                <p>PID: {this.state.payload['pid']}</p>
                                <p>PHONE NUMBER: {this.state.payload['phone_number']}</p>
                                <p>CARD UID: {this.state.payload['card_uid']}</p>
                                <p style={{
                                    color: this.state.payload['days_left'] <= 3 ? 'red' : 'grey'
                                }}>DAYS LEFT: {this.state.payload['days_left']}</p>
                                <p>EXPIRES AT: <strong>{this.state.payload['expires_at']}</strong></p>
                                {/*{this.state.payload["biometry_identifier_path"] !== null ? (*/}
                                {/*    <div className={"w3-container w3-center"}>*/}
                                {/*        <img width={600} src={this.state.payload["biometry_identifier_path"]} alt={this.state.payload['pid']}/>*/}
                                {/*    </div>*/}
                                {/*) : null}*/}
                            </div>
                        ) : (
                            <div className={"w3-container"}>
                                <p style={{ color: 'red'}}>CARD IS NOT AUTHORIZED!</p>
                            </div>
                        )}
                        <footer className={"w3-container w3-blue-gray"}>
                            <p>WINDOW WILL BE CLOSED AFTER 3 SECOND(s)</p>
                        </footer>
                    </div>
                </div>
                <div className="w3-panel w3-pale-blue w3-border">
                    <h3>Information!</h3>
                    <p>Here is today visits registered by UTC your current timezone is +4 Tbilisi/Georgia.</p>
                </div>
                <div className={"w3-light-grey"} style={{
                    display: this.state.isLoading ? 'block' : 'none'
                }}>
                    <h4 className={'w3-center'}>PLEASE WAIT ...</h4>
                    <div id={"myBar"} className={"w3-container w3-blue-gray w3-center"} style={{
                        width: '20%'
                    }}>20%</div>
                </div>
                {this.state.customerVisits.length > 0 ? (
                    <div className={'w3-row'}>
                        <table className={"w3-table-all w3-hoverable"}>
                            <thead>
                            <tr className={"w3-light-grey"}>
                                <th>First And Last Name</th>
                                <th>Phone number</th>
                                <th>PID</th>
                                <th>VISIT COUNT</th>
                                <th>DAYS PASSED / LEFT</th>
                                <th>EXPIRATION DATE</th>
                                <th>...</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.customerVisits.map((val: any, key: any) => {
                                return (
                                    <tr key={key} className={`${val.days_left < 2 ? 'w3-pale-red' : ''}`}>
                                        <td>{val.first_name} {val.last_name}</td>
                                        <td>{val.phone_number}</td>
                                        <td>{val.pid}</td>
                                        <td>{val.attends_count}</td>
                                        <td>{val.days_passed} DAYS PASSED / LEFT: {val.days_left}</td>
                                        <td>{val.expires_at}</td>
                                        <td><Link to={`/customers/details/${val.customer_id}`}>View Details</Link></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={'w3-row'}>
                        <p className={'w3-center'} style={{ display: this.state.isLoading ? 'none' : 'block' }}>No visits right now...</p>
                    </div>
                )}
                {/*<Route exact path="/" render={()=> (*/}
                {/*    <Redirect to="/auth" />*/}
                {/*)} />*/}
                <div className={"w3-container"}>
                    {/*<div className={"w3-bar"}>*/}
                    {/*    <button className={"w3-button"}>«</button>*/}
                    {/*    <button className={"w3-button w3-green"}>1</button>*/}
                    {/*    <button className={"w3-button"}>»</button>*/}
                    {/*</div>*/}
                    {/*{this.state.pagination}*/}
                </div>
                {/*<div className={'w3-margin w3-padding'}>*/}
                {/*    <button className={"w3-btn w3-blue-gray w3-border-white"} onClick={() => {*/}
                {/*        this.logOut();*/}
                {/*    }}>Log off*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default MainPage;
