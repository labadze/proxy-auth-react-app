import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ItemListComponent extends Component<any, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }
    async componentDidMount() {

    }

    render() {
        return (
            <>
                <tr key={this.props.id}>
                    <td>{this.props.id}</td>
                    <td>{this.props.entry_value}</td>
                    <td>{this.props.is_active ? 'TRUE' : 'FALSE'}</td>
                    <td>{this.props.rate}</td>
                    <td>{this.props.carma}</td>
                    <td><Link to={`/customers/details/${this.props.id}`}>View Details</Link></td>
                </tr>
            </>
        );
    }
}

export default ItemListComponent;
