import React, {Component} from 'react';

class NotFoundPage extends Component<{}, { [key: string]: any }> {
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
                <h1>Page not found 404</h1>
            </div>
        );
    }
}

export default NotFoundPage;
