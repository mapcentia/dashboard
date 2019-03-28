import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const translationPrefix = `components.SigninForm`;

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
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">
                    <FormattedMessage id={`${translationPrefix}.userName`} />
                </InputLabel>
                <Input id="username" name="username" autoFocus value={this.state.user} onChange={(event) => { this.setState({ user: event.target.value }) }}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">
                    <FormattedMessage id={`${translationPrefix}.password`} />
                </InputLabel>
                <Input name="password" type="password" id="password" value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }) }}/>
            </FormControl>
            <Button type="button" onClick={() => { this.props.onSubmit(this.state.user, this.state.password)}} fullWidth variant="contained" disabled={this.state.user.length < MIN_LENGTH || this.state.password.length < MIN_LENGTH} color="primary">
                <FormattedMessage id={`${translationPrefix}.signIn`} />
            </Button>
        </form>);
    }
}

SigninForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default SigninForm;