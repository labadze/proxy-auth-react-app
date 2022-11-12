import React, {Component} from 'react';

class InternalServerErrorPage extends Component<{}, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }
    async componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>Internal Server Error</h1>
            </div>
        );
    }
}

export default InternalServerErrorPage;
