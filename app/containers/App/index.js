import React from 'react';
import { Switch } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { checkAuthorizationRequest } from 'containers/App/actions';
import { withRouter, Route } from "react-router";

import Footer from 'components/Footer/Loadable';
import SigninPage from 'containers/SigninPage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import PublishedConfigurationsPage from 'containers/PublishedConfigurationsPage/Loadable';
import AccountPage from 'containers/AccountPage/Loadable';
import SubuserPage from 'containers/SubuserPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ConfigurationPage from 'containers/ConfigurationPage/Loadable';

import PublicLayoutRoute from 'containers/PublicLayoutRoute';
import ProtectedLayoutRoute from 'containers/ProtectedLayoutRoute';

import saga from 'containers/App/saga';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.checkAuthorization();
    }

    render() {
        return (<div>
            <Switch>
                <ProtectedLayoutRoute exact path="/" component={DashboardPage} />
                <Route exact path="/configuration/published/:id" component={PublishedConfigurationsPage} />
                <ProtectedLayoutRoute exact path="/account" component={AccountPage} />
                <ProtectedLayoutRoute exact path="/configuration/add" component={ConfigurationPage} />
                <ProtectedLayoutRoute exact path="/configuration/edit/:id" component={ConfigurationPage} />
                <ProtectedLayoutRoute exact path="/subuser/add" component={SubuserPage} />
                <ProtectedLayoutRoute exact path="/subuser/edit/:id" component={SubuserPage} />
                <PublicLayoutRoute exact path="/sign-in" component={SigninPage} />
                <PublicLayoutRoute exact path="/sign-up" component={SignupPage} />
                <PublicLayoutRoute path="" component={NotFoundPage} />
            </Switch>
            <Footer />
        </div>);
    }
}

export function mapDispatchToProps(dispatch) {
    return { checkAuthorization: () => dispatch(checkAuthorizationRequest()), };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'app', saga });

export default withRouter(compose(withSaga, withConnect)(App));