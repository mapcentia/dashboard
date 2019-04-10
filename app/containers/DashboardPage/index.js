import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.PureComponent {
    componentDidMount() { }

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="flex-start">
                <Grid item>
                    <Typography variant="h6" color="inherit">
                        To do next: CRUD subusers
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(DashboardPage);
