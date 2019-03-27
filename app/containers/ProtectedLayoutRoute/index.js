import React, { Component } from 'react';
import { Route } from 'react-router-dom';

const ProtectedLayout = ({ children }) => (
    <div>
        <p>This is public Layout</p>
        {children}
    </div>
);

class ProtectedLayoutRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={matchProps => (
                <ProtectedLayout>
                    <Component {...matchProps} />
                </ProtectedLayout>
            )} />
        )
    }
}

export default ProtectedLayoutRoute;