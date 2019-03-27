import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

class SigninForm extends React.Component {
    constructor(props) {
        console.log(`### props`, props);
        super(props);
    }

    render() {
        return (<div>Sup</div>);
    }
}

SigninForm.propTypes = {
    onSuccess: PropTypes.func.isRequired
};

export default connect({})(SigninForm);