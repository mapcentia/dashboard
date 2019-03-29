import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { withRouter } from "react-router";

import AppLoadingOverlay from 'components/AppLoadingOverlay';
import { makeSelectIsAuthenticating, makeSelectIsAuthenticated, makeSelectUser } from 'containers/App/selectors';

class ProtectedLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        if (this.props.isAuthenticating === false) {
            if (this.props.isAuthenticated) {

                console.log(`### welcome user`, this.props.user);

                return (
                    <div>
                        <p>This is protected Layout</p>
                        {children}
                    </div>
                );
            } else {
                return (<Redirect to="/sign-in"/>);
            }
        } else {
            return (<AppLoadingOverlay/>);
        }
    }
}

class ProtectedLayoutRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (<Route {...rest} render={matchProps => (
            <ProtectedLayout {...this.props}>
                <Component {...matchProps} />
            </ProtectedLayout>
        )} />);
    }
}

const mapStateToProps = createStructuredSelector({
    isAuthenticating: makeSelectIsAuthenticating(),
    isAuthenticated: makeSelectIsAuthenticated(),
    user: makeSelectUser()
});

export default withRouter(connect(mapStateToProps)(ProtectedLayoutRoute));