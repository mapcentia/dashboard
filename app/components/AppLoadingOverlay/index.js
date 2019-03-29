import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const LoadingWrapper = styled.div`
    position: absolute;
    top: 40%;
    left: calc(50% - 150px);
    text-align: center;
    width: 300px;
`;

const TextWrapper = styled.div` padding-top: 20px; `;

const AppLoadingOverlay = () => {
    return (<LoadingWrapper>
        <CircularProgress/>
        <TextWrapper>
            <Typography variant="subtitle1" gutterBottom>
                <FormattedMessage id={`checkingAuthorizationStatus`} />
            </Typography>
        </TextWrapper>
    </LoadingWrapper>);
};

export default AppLoadingOverlay;