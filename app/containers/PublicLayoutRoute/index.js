import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

const PublicLayout = ({ children }) => (
    <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
            <div style={{ paddingTop: `40px`, textAlign: `center` }}>
                {children}
            </div>
        </Grid>
    </Grid>
);

class PublicLayoutRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={matchProps => (
                <PublicLayout>
                    <Component {...matchProps} />
                </PublicLayout>
            )} />
        )
    }
}

export default PublicLayoutRoute;  