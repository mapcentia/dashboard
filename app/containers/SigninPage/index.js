import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { makeSelectSigningIn, makeSelectSigningInError } from 'containers/App/selectors';
import { signInRequest, getDatabasesRequest, getDatabasesReset } from 'containers/App/actions';
import SigninForm from './SigninForm';
import PublicFormsWrapper from 'components/PublicFormsWrapper';
import StyledLink from 'components/StyledLink';

const ErrorWrapper = styled.div`
    padding-top: 10px;
`;

class Signin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let prefix = (process.env.WEBPACK_PUBLIC_PATH ? process.env.WEBPACK_PUBLIC_PATH : `/`);
        return (
            <PublicFormsWrapper>
                <SigninForm
                    disabled={this.props.signingIn ? true : false}
                    onGetDatabases={(userName) => { this.props.dispatch(getDatabasesRequest(userName))}}
                    onReset={() => { this.props.dispatch(getDatabasesReset())}}
                    onSubmit={(data) => { this.props.dispatch(signInRequest(data)); }}/>
                {this.props.signingInError ? (
                    <ErrorWrapper>
                        <Typography variant="body1" gutterBottom color="error">
                            <FormattedMessage id="Invalid username or password" />
                        </Typography>
                    </ErrorWrapper>
                ) : false}
                <Divider style={{ marginTop: `20px`, marginBottom: `20px` }}/>
                <StyledLink to={prefix + "sign-up"}>
                    <Button type="submit" fullWidth variant="contained" color="secondary">
                        <FormattedMessage id="Register" />
                    </Button>
                </StyledLink>
            </PublicFormsWrapper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    signingIn: makeSelectSigningIn(),
    signingInError: makeSelectSigningInError(),
});

export default connect(mapStateToProps)(Signin);