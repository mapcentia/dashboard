import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { makeSelectSigningUp, makeSelectSigningUpSuccess, makeSelectsigningUpSuccessUserName, makeSelectSigningUpError, makeSelectSigningUpErrorCode } from 'containers/App/selectors';
import { signUpRequest } from 'containers/App/actions';
import SignupForm from './SignupForm';
import PublicFormsWrapper from 'components/PublicFormsWrapper';
import StyledLink from 'components/StyledLink';

const ErrorWrapper = styled.div`
    padding-top: 10px;
`;

const SuccessWrapper = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
`;

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PublicFormsWrapper>
                {this.props.success && this.props.username ? (
                    <SuccessWrapper>
                        <Typography variant="h6" gutterBottom>
                            <FormattedMessage id="User was created, you can now Sign in" />
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            <FormattedMessage id="Username" />: <strong>{this.props.username}</strong>
                        </Typography>
                    </SuccessWrapper>
                ) : (
                    <SignupForm disabled={this.props.loading ? true : false} onSubmit={data => { this.props.dispatch(signUpRequest(data))}}/>
                )}

                {this.props.error ? (
                    <ErrorWrapper>
                        <Typography variant="body1" gutterBottom color="error">
                            <FormattedMessage id={`errors.${this.props.errorCode}`} />
                        </Typography>
                    </ErrorWrapper>
                ) : false}
                {this.props.success ? false : (<Divider style={{ marginTop: `20px`, marginBottom: `20px` }}/>)}
                <StyledLink to="/sign-in">
                    <Button type="button" fullWidth variant="contained" color="secondary">
                        <FormattedMessage id="signIn" />
                    </Button>
                </StyledLink>
            </PublicFormsWrapper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loading: makeSelectSigningUp(),
    success: makeSelectSigningUpSuccess(),
    username: makeSelectsigningUpSuccessUserName(),
    error: makeSelectSigningUpError(),
    errorCode: makeSelectSigningUpErrorCode(),
});

export default connect(mapStateToProps)(SignupPage);