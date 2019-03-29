import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { makeSelectSigningIn, makeSelectSigningInError } from 'containers/App/selectors';
import { signInRequest } from 'containers/App/actions';
import SigninForm from 'components/SigninForm';

const translationPrefix = `containers.SigninPage`;

const LogoWrapper = styled.div`
    max-height: 200px;
    max-widht: 200px;
    padding-bottom: 40px;
`;

class Signin extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmitHandler(user, password) {
        this.props.dispatch(signInRequest({ user, password }));
    }

    render() {

//console.log(`### error`, this.props.signingInError);
//console.log(`### signingIn`, this.props.signingIn);

        return (
            <Card style={{ maxWidth: `400px` }}>
                <CardContent>
                    <LogoWrapper>
                        <img src="/assets/img/MapCentia_500.png" style={{ maxWidth: `150px`, height: `auto` }}/>
                    </LogoWrapper>
                    <Typography variant="h5" gutterBottom>
                        <FormattedMessage id={`welcomeDescription`} />
                    </Typography>
                    <SigninForm onSubmit={this.onSubmitHandler.bind(this)}/>
                    <Divider style={{ marginTop: `20px`, marginBottom: `20px` }}/>
                    <Button type="submit" fullWidth variant="contained" color="secondary">
                        <FormattedMessage id={`${translationPrefix}.register`} />
                    </Button>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    signingIn: makeSelectSigningIn(),
    signingInError: makeSelectSigningInError(),
});

export default connect(mapStateToProps)(Signin);