import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import SigninForm from 'components/SigninForm';

export default function Signin() {
    return (
        <Card style={{ maxWidth: `500px` }}>
            <CardContent>

                <img src="/assets/img/MapCentia_500.png"/>

                <Typography variant="h4" gutterBottom>
                    <FormattedMessage id={`welcomeDescription`} />
                </Typography>
                <SigninForm />
            </CardContent>
        </Card>
    );
}
