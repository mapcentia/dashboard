import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SubusersPanel from 'components/SubusersPanel';

import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.PureComponent {
    componentDidMount() { }

    render() {

        // @todo Different layout for super and sub users

        return (
            <Grid container spacing={24}>
                <Grid item md={6}>
                    <Typography variant="h6" color="inherit">
                        <FormattedMessage id="Schemas"/>
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <SubusersPanel/>
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
