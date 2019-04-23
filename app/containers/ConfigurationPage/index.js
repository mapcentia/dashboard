import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { makeSelectCreateUser, makeSelectCreateUserSuccess, makeSelectCreateUserSuccessUserName, makeSelectCreateUserError, makeSelectCreateUserErrorCode } from 'containers/App/selectors';
import PublicFormsWrapper from 'components/PublicFormsWrapper';
import StyledLink from 'components/StyledLink';

const ErrorWrapper = styled.div`
    padding-top: 10px;
`;

class ConfigurationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ``,
            description: ``,
            body: ``,
            published: true,
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (<Grid container spacing={8} direction="row" alignItems="center" justify="center">
            <Grid item xs>
                <Grid container>
                    <Grid item>
                        <Typography variant="h6" color="inherit">
                            <FormattedMessage id="Add configuration"/>
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" justify="center">
                    <Grid item xs>
                        <TextField
                            id="name"
                            name="name"
                            required
                            fullWidth={true}
                            label={this.props.intl.formatMessage({id: "Name"})}
                            value={this.state.name}
                            onChange={(event) => { this.setState({ name: event.target.value }) }}/>
                    </Grid>
                    <Grid item xs style={{textAlign: `right`}}>
                        <Button variant="contained" size="small">
                            <FormattedMessage id="Help"/>
                        </Button>
                        <Button variant="contained" color="primary" size="small" style={{marginLeft: `10px`}}>
                            <FormattedMessage id="Save"/>
                        </Button>
                        <Button variant="contained" size="small" style={{marginLeft: `10px`}}>
                            <FormattedMessage id="Delete"/>
                        </Button>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" justify="center">
                    <Grid item xs>
                        <TextField
                            id="description"
                            name="description"
                            fullWidth={true}
                            label={this.props.intl.formatMessage({id: "Description"})}
                            value={this.state.description}
                            onChange={(event) => { this.setState({ description: event.target.value }) }}/>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" justify="center">
                    <Grid item xs>
                        <TextField
                            id="body"
                            name="body"
                            fullWidth={true}
                            multiline={true}
                            rows={10}
                            label={this.props.intl.formatMessage({id: "Configuration"})}
                            value={this.state.body}
                            onChange={(event) => { this.setState({ body: event.target.value }) }}/>
                    </Grid>
                </Grid>



            </Grid>
        </Grid>);
    }
}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(injectIntl(ConfigurationPage));