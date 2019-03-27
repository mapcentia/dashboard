import React from 'react';
import { FormattedMessage } from 'react-intl';
import StyledLink from 'components/StyledLink';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const translationPrefix = `containers.NotFoundPage`;

export default function NotFound() {
    return (<div>
        <Typography variant="h3" gutterBottom>
            <FormattedMessage id={`${translationPrefix}.notFound`} />
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            <FormattedMessage id={`${translationPrefix}.pleaseCheckTheAddressOrContactTheSupport`} />
        </Typography>
        <StyledLink to="/">
            <Button variant="contained" color="primary">
                <FormattedMessage id={`${translationPrefix}.homePage`} />
            </Button>
        </StyledLink>
    </div>);
}
