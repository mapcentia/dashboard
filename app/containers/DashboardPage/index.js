import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { signOut } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.PureComponent {
    componentDidMount() { }

    render() {
        console.log(this.props);
        return (
            <div>
                <Typography variant="h1" gutterBottom>GC2 Dashboard</Typography>
                <Button variant="contained" onClick={this.props.onSignOut}>LOG OUT</Button>
            </div>
        );
    }
}

DashboardPage.propTypes = {
};

export function mapDispatchToProps(dispatch) {
    return {
        onSignOut: () => dispatch(signOut()),
    };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(DashboardPage);
