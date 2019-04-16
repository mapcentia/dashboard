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

import SchemasPanel from 'components/SchemasPanel';
import SubusersPanel from 'components/SubusersPanel';

import { makeSelectUser } from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.PureComponent {
    componentDidMount() { }

    render() {
        if (this.props.user.subuser) {
            return (<Grid container spacing={24}>
                <Grid item md={12}>
                    <SchemasPanel/>
                </Grid>
            </Grid>);
        } else {
            return (<Grid container spacing={24}>
                <Grid item md={6}>
                    <SchemasPanel/>
                </Grid>
                <Grid item md={6}>
                    <SubusersPanel/>
                </Grid>
            </Grid>);
        }
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser()
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(DashboardPage);
