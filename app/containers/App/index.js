import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Footer from 'components/Footer/Loadable';
import SigninPage from 'containers/DashboardPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import PublicLayoutRoute from 'containers/PublicLayoutRoute';
import ProtectedLayoutRoute from 'containers/ProtectedLayoutRoute';

export default class App extends React.Component {
    constructor(props) {
        console.log(`### props`, props);
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
