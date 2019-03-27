import React from 'react';
import { FormattedMessage } from 'react-intl';

import Typography from '@material-ui/core/Typography';
import messages from './messages';

export default function Signin() {
    return (
        <article>
            <Typography variant="h1" gutterBottom>
                <FormattedMessage {...messages.header} />
            </Typography>
        </article>
    );
}
