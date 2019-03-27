import React from 'react';
import { Switch, Route } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';

import Footer from 'components/Footer/Loadable';
import SigninPage from 'containers/SigninPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import PublicLayoutRoute from 'containers/PublicLayoutRoute';
import ProtectedLayoutRoute from 'containers/ProtectedLayoutRoute';

import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Switch>
                    <PublicLayoutRoute exact path="/sign-in" component={SigninPage} />
                    <ProtectedLayoutRoute exact path="/" component={DashboardPage} />
                    <PublicLayoutRoute path="" component={NotFoundPage} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
    withReducer,
    withSaga,
)(App);