import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {injectIntl} from 'react-intl';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const MIN_LENGTH = 3;

class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ``,
            password: ``
        };
    }

    render() {
        return (<form>
            <div style={{ paddingBottom: `20px`}}>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        id="username"
                        name="username"
                        autoFocus
                        required
                        label={this.props.intl.formatMessage({id: "Username"})}
                        disabled={this.props.disabled}
                        value={this.state.user} onChange={(event) => { this.setState({ user: event.target.value }) }}/>
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        required
                        label={this.props.intl.formatMessage({id: "Password"})}
                        disabled={this.props.disabled}
                        value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }) }}/>
                </FormControl>
            </div>
            <Button type="button" onClick={() => { this.props.onSubmit(this.state.user, this.state.password)}} fullWidth variant="contained" disabled={this.props.disabled || this.state.user.length < MIN_LENGTH || this.state.password.length < MIN_LENGTH} color="primary">
                <FormattedMessage id={`Sign in`} />
            </Button>
        </form>);
    }
}

SigninForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default injectIntl(SigninForm);