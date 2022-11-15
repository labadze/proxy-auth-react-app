import React, {Component} from 'react';
import ItemListComponent from "./components/ItemListComponent";
import {retrieveItems} from "../../services/httpx.manager";

class ItemListPage extends Component<any, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            isAuthorized: false,
            items: []
        };
    }
    async componentDidMount() {
        const itemsResult = await retrieveItems(10, 0);
        if (itemsResult === null) {
            this.setState({
                isAuthorized: false,
            })
        } else {
            this.setState({
                isAuthorized: true,
                items: itemsResult,
            });
        }

    }

    render() {
        return (
            <div style={{
                marginTop: '5%'
            }}>
                <div className={'w3-row'}>
                    {this.state.isAuthorized === false ? (
                        <div className={"w3-panel w3-pale-red w3-border"}>
                            <h3>Unauthorized!</h3>
                            <p>Please log in to view items.</p>
                        </div>
                    ) : null}
                    {this.state.items.length > 0 ? (
                        <table className={"w3-table-all w3-hoverable"}>
                            <thead>
                            <tr className={"w3-light-grey"}>
                                <th>ITEM ID</th>
                                <th>ENTRY VALUE</th>
                                <th>IS ACTIVE</th>
                                <th>RATE</th>
                                <th>CARMA</th>
                                <th>...</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.items.map((val: any, key: any) => {
                                return (<ItemListComponent key={key} id={val.id} entry_value={val.entry_value} carma={val.carma} is_active={val.is_active} rate={val.rate}/>)
                            })}
                            </tbody>
                        </table>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default ItemListPage;
