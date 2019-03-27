import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const translationPrefix = `boilerplate.containers.NotFoundPage`;

export default function NotFound() {
    return (
        <Grid container>
            <Grid item>
                <div style={{ paddingTop: `40px`, textAlign: `center` }}>
                    <Typography variant="h3" gutterBottom>
                        <FormattedMessage id={`${translationPrefix}.notFound`} />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <FormattedMessage id={`${translationPrefix}.pleaseCheckTheAddressOrContactTheSupport`} />
                    </Typography>
                    <Link to="/">
                        <Button variant="contained" color="primary">
                            <FormattedMessage id={`${translationPrefix}.homePage`} />
                        </Button>
                    </Link>
                </div>
            </Grid>
        </Grid>
    );
}
