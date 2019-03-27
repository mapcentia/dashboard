import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { checkAuthorizationRequest } from 'containers/App/actions';
import { makeSelectIsAuthenticating, makeSelectIsAuthenticated, makeSelectUser } from 'containers/App/selectors';

const translationPrefix = `containers.ProtectedLayoutRoute`;

const ProtectedLayout = ({ children }) => (
    <div>
        <p>This is public Layout</p>
        {children}
    </div>
);

const LoadingWrapper = styled.div`
    position: absolute;
    top: 40%;
    left: calc(50% - 150px);
    text-align: center;
    width: 300px;
`;

const TextWrapper = styled.div` padding-top: 20px; `;

class ProtectedLayoutRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(checkAuthorizationRequest());
    }

    render() {
        if (this.props.isAuthenticating) {
            return (<LoadingWrapper>
                <CircularProgress/>
                <TextWrapper>
                    <Typography variant="subtitle1" gutterBottom>
                        <FormattedMessage id={`${translationPrefix}.checkingAuthorizationStatus`} />
                    </Typography>
                </TextWrapper>
            </LoadingWrapper>);
        } else {
            if (this.props.isAuthenticated) {
                const { component: Component, ...rest } = this.props;
                return (
                    <Route {...rest} render={matchProps => (
                        <ProtectedLayout>
                            <Component {...matchProps} />
                        </ProtectedLayout>
                    )} />
                )
            } else {
                return (<Redirect to="/sign-in" />);
            }
        }
    }
}

const mapStateToProps = createStructuredSelector({
    isAuthenticating: makeSelectIsAuthenticating(),
    isAuthenticated: makeSelectIsAuthenticated(),
    user: makeSelectUser()
});

export default connect(mapStateToProps)(ProtectedLayoutRoute);