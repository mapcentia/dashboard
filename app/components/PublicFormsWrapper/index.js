import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const LogoWrapper = styled.div`
    max-height: 200px;
    max-widht: 200px;
    padding-bottom: 40px;
`;

const wrapper = (props) => {
    const { children } = props;
    let prefix = (process.env.WEBPACK_PUBLIC_PATH ? process.env.WEBPACK_PUBLIC_PATH : `/`);
    return (<Card style={{ maxWidth: `400px` }}>
        <CardContent>
            <LogoWrapper>
                <img src={prefix + "assets/img/MapCentia_500.png"} style={{ maxWidth: `150px`, height: `auto` }}/>
            </LogoWrapper>
            <Typography variant="h5" gutterBottom>
                <FormattedMessage id={`welcomeDescription`} />
            </Typography>
            <div>
                {children}
            </div>
        </CardContent>
    </Card>);
} 

export default wrapper;