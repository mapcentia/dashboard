import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const translationPrefix = `containers.SigninPage`;

class SigninForm extends React.Component {
    constructor(props) {
        console.log(`### SigninForm props`, props);
        super(props);
    }

    render() {
        return (<form>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">
                    <FormattedMessage id={`${translationPrefix}.userName`} />
                </InputLabel>
                <Input id="username" name="username" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">
                    <FormattedMessage id={`${translationPrefix}.password`} />
                </InputLabel>
                <Input name="password" type="password" id="password"/>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
                <FormattedMessage id={`${translationPrefix}.signIn`} />
            </Button>
        </form>);
    }
}

SigninForm.propTypes = {
    onSuccess: PropTypes.func.isRequired
};

export default SigninForm;