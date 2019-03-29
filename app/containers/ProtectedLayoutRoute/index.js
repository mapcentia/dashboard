import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { withRouter } from "react-router";
import { FormattedMessage } from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { signOut } from 'containers/App/actions';

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
                return (
                    <div>
                        <div>
                            <AppBar position="static">
                                <Toolbar>
                                    <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                        <Grid item>
                                            <Typography variant="h6" color="inherit">
                                                <FormattedMessage id="Geocloud Dashboard" />
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button color="inherit" onClick={this.props.onSignOut}>
                                                <FormattedMessage id="Sign out" />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Toolbar>
                            </AppBar>
                        </div>
                        <div>
                            {children}
                        </div>                       
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

export function mapDispatchToProps(dispatch) {
    return {
        onSignOut: () => dispatch(signOut()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProtectedLayoutRoute));