import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import StyledButtonLink from 'components/StyledButtonLink';
import { getConfigurationsRequest, deleteConfigurationRequest, createUpdateConfigurationReset, createConfigurationRequest, updateConfigurationRequest } from 'containers/App/actions';

import { makeSelectConfigurations, makeSelectUser, makeSelectCreateConfigurationLoading,
    makeSelectCreateConfigurationSuccess, makeSelectUpdateConfigurationSuccess } from 'containers/App/selectors';
import PublicFormsWrapper from 'components/PublicFormsWrapper';
import StyledLink from 'components/StyledLink';

const placeholder = {
    "schemata": [
        "public"
    ],
    "brandName": "MapCentia ApS",
    "aboutBox": "<p>My awesome web map</p>",
    "enabledExtensions": [
        "conflictSearch",
        "streetView",
        "coordinates",
        "session",
        "editor",
        "offlineMap"
    ],

    "template": "default.tmpl",
    "enabledPrints": ["print"],
    "enabledSearch": "google",
    "extensionConfig": {

    },
    "baseLayers": [
        {"id": "stamenTonerLite", "name": "Stamen Toner Light"},
        {"id": "osm", "name": "Open Street Map"}
    ]
};

const initialState = {
    configurations: [],
    key: false,
    configurationWasSet: false,
    name: ``,
    description: ``,
    body: placeholder,
    published: true,
};

class ConfigurationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({
                key: this.props.match.params.id
            });
        }

        this.props.dispatch(getConfigurationsRequest({userId: this.props.user.screenName}));
    }

    componentWillUnmount() {
        this.props.dispatch(createUpdateConfigurationReset());
    }

    static getDerivedStateFromProps(newProps, currentState) {
        if (newProps.configurations && currentState.configurationWasSet === false && (newProps.configurations.length > 0)) {
            let newState = { configurations: newProps.configurations };
            newProps.configurations.map(item => {
                if (currentState.key === item.key) {
                    let parsedData = JSON.parse(item.value);
                    newState.name = parsedData.name;
                    newState.description = parsedData.description;
                    newState.body = JSON.parse(parsedData.body);
                    newState.published = parsedData.published;
                    newState.configurationWasSet = true;
                }
            });

            return newState;
        }

        return null;
    }

    handleJSONUpdate(value) {
        if (value.jsObject) {
            this.setState({ body: value.jsObject });
        } else {
            this.setState({ body: false });
        }
    }

    handleFormSubmit() {
        if (this.state.key) {
            this.props.dispatch(updateConfigurationRequest({
                userId: this.props.user.screenName,
                data: this.state
            }));
        } else{
            this.props.dispatch(createConfigurationRequest({
                userId: this.props.user.screenName,
                data: this.state
            }));
        }
    }

    handleReset() {
        this.setState(initialState, () => {
            this.props.dispatch(createUpdateConfigurationReset());
        });
    }

    handleDelete() {
        if (confirm(this.props.intl.formatMessage({id: `Delete`}) + ` ${this.state.name}?`)) {
            this.props.dispatch(deleteConfigurationRequest({
                userId: this.props.user.screenName,
                configurationId: this.state.key
            }));

            this.props.history.push('/#configuration');
        }
    }

    render() {
        let appBaseURL = (process.env.WEBPACK_PUBLIC_PATH ? process.env.WEBPACK_PUBLIC_PATH : `/`);

        let dataIsValid = false;
        if (this.state.name && this.state.body && Object.keys(this.state.body).length > 0) {
            dataIsValid = true;
        }

        let localPlaceholder = (this.state.key ? this.state.body : placeholder);
        let formPanel = (<Grid item xs>
            <Grid container>
                <Grid item>
                    <Typography variant="h6" color="inherit">
                        {this.state.key ? (<FormattedMessage id="Update configuration"/>) : (<FormattedMessage id="Add configuration"/>)}
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
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!dataIsValid}
                        size="small"
                        style={{marginLeft: `10px`}}
                        onClick={this.handleFormSubmit.bind(this)}>
                        <FormattedMessage id="Save"/>
                    </Button>
                    {this.state.key ? (<Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{marginLeft: `10px`}}
                        onClick={this.handleDelete.bind(this)}>
                        <FormattedMessage id="Delete"/>
                    </Button>) : false}
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
                <Grid item xs style={{paddingTop: `20px`, paddingBottom: `20px`}}>
                    <JSONInput
                        id="unique_id"
                        placeholder={localPlaceholder}
                        locale={locale}
                        theme="dark_vscode_tribute"
                        width="100%"
                        height="550px"
                        onChange={this.handleJSONUpdate.bind(this)}/>
                </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item xs>
                    <FormControlLabel
                        control={<Checkbox
                            checked={this.state.published}
                            onChange={(event) => { this.setState({ published: event.target.checked })}}
                            value="checkedA"/>}
                        label={this.props.intl.formatMessage({id: "Published"})}/>
                </Grid>
            </Grid>
        </Grid>);

        let successPanel = false;
        if (this.props.createSuccess) {
            successPanel = (<Grid item style={{textAlign: `center`}}>
                <div style={{paddingTop: `40px`, paddingBottom: `40px`}}>
                    <Typography variant="h6" color="inherit">
                        <FormattedMessage id="Configuration was added"/>
                    </Typography>
                    <div style={{paddingTop: `10px`}}>
                        <Button variant="contained" size="small" onClick={this.handleReset.bind(this)}>
                            <FormattedMessage id="Add new configuration"/>
                        </Button>
                        <StyledButtonLink to={appBaseURL + "#configuration"}>
                            <Button color="primary" variant="contained" size="small" style={{marginLeft: `10px`}}>
                                <FormattedMessage id="Dashboard"/>
                            </Button>
                        </StyledButtonLink>
                    </div>
                </div>
            </Grid>);
        }

        if (this.props.updateSuccess) {
            successPanel = (<Grid item style={{textAlign: `center`}}>
                <div style={{paddingTop: `40px`, paddingBottom: `40px`}}>
                    <Typography variant="h6" color="inherit">
                        <FormattedMessage id="Configuration was updated"/>
                    </Typography>
                    <div style={{paddingTop: `10px`}}>
                        <StyledButtonLink to={appBaseURL + "configuration/add"}>
                            <Button variant="contained" size="small" >
                                <FormattedMessage id="Add new configuration"/>
                            </Button>
                        </StyledButtonLink>
                        <StyledButtonLink to={appBaseURL + "#configuration"}>
                            <Button color="primary" variant="contained" size="small" style={{marginLeft: `10px`}}>
                                <FormattedMessage id="Dashboard"/>
                            </Button>
                        </StyledButtonLink>
                    </div>
                </div>
            </Grid>);
        }

        return (<Grid container spacing={8} direction="row" alignItems="center" justify="center">
            {this.props.createSuccess || this.props.updateSuccess ? (successPanel) : (formPanel)}
        </Grid>);
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    loading: makeSelectCreateConfigurationLoading(),
    createSuccess: makeSelectCreateConfigurationSuccess(),
    updateSuccess: makeSelectUpdateConfigurationSuccess(),
    configurations: makeSelectConfigurations()
});

export default connect(mapStateToProps)(injectIntl(ConfigurationPage));