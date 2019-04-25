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
import { createConfigurationReset, createConfigurationRequest, updateConfigurationRequest } from 'containers/App/actions';

import { makeSelectUser, makeSelectCreateConfigurationLoading, makeSelectCreateConfigurationSuccess, makeSelectCreateConfigurationError, makeSelectUpdateConfigurationSuccess, makeSelectUpdateConfigurationError } from 'containers/App/selectors';
import PublicFormsWrapper from 'components/PublicFormsWrapper';
import StyledLink from 'components/StyledLink';

const placeholder = {
    "backend": "gc2",
    "gc2": {
        "host": "https://gc2.mapcentia.com"
    },
    "configUrl": "https://mapcentia.github.io",
    "print": {
        "templates": {
            "print": {
                A4: {
                    l: {
                        mapsizePx: [1060, 730],
                        mapsizeMm: [280, 192]
                    },
                    p: {
                        mapsizePx: [730, 1060],
                        mapsizeMm: [192, 280]
                    }
                }
            },
            "_conflictPrint": {
                "A4": {
                    "p": {
                        "mapsizePx": [700, 500],
                        "mapsizeMm": [190, 120]
                    }
                }
            }
        },
        "scales": [100, 250, 500, 1000, 2000, 3000, 4000, 5000, 7500, 10000, 15000, 25000, 50000, 100000]
    },
    "extensions": {
        "browser": [
            {"conflictSearch": ["index", "reportRender", "infoClick", "controller"]},
            {"streetView": ["index"]},
            {"coordinates": ["index"]},
            {"offlineMap": ["index"]},
            {"session": ["index"]},
            {"editor": ["index"]}
        ],
        "server": [
            {"conflictSearch": ["index"]},
            {"session": ["index"]},
        ]
    },

    "searchModules": ["google", "danish"],
    "autoLoadingConfig": true,
    "defaultConfig": "vidi.json",
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
        "layerSearch": {
            "host": "localhost:9200"
        }
    },
    "baseLayers": [
        {"id": "stamenTonerLite", "name": "Stamen Toner Light"},
        {"id": "osm", "name": "Open Street Map"}
    ]
};

const initialState = {
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
            
            this.props.configurations.map(item => {
                console.log(item);
            })
        }

        console.log(this.props);

    }

    handleJSONUpdate(value) {
        if (value.jsObject) {
            this.setState({ body: value.jsObject });
        } else {
            this.setState({ body: false });
        }
    }

    handleFormSubmit() {
        this.props.dispatch(createConfigurationRequest({
            userId: this.props.user.screenName,
            data: this.state
        }));
    }

    handleReset() {
        this.setState(initialState, () => {
            this.props.dispatch(createConfigurationReset());
        });
    }

    render() {

        console.log(`### props`, this.props);

        let dataIsValid = false;
        if (this.state.name && this.state.body && Object.keys(this.state.body).length > 0) {
            dataIsValid = true;
        }

        let formPanel = (<Grid item xs>
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
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!dataIsValid}
                        size="small"
                        style={{marginLeft: `10px`}}
                        onClick={this.handleFormSubmit.bind(this)}>
                        <FormattedMessage id="Save"/>
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
                <Grid item xs style={{paddingTop: `20px`, paddingBottom: `20px`}}>
                    <JSONInput
                        id="unique_id"
                        placeholder={placeholder}
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

        let successPanel = (<Grid item style={{textAlign: `center`}}>
            <div style={{paddingTop: `40px`, paddingBottom: `40px`}}>
                <Typography variant="h6" color="inherit">
                    <FormattedMessage id="Configuration was added"/>
                </Typography>
                <div style={{paddingTop: `10px`}}>
                    <Button variant="contained" size="small" onClick={this.handleReset.bind(this)}>
                        <FormattedMessage id="Add new configuration"/>
                    </Button>
                    <StyledButtonLink to="/">
                        <Button color="primary" variant="contained" size="small" style={{marginLeft: `10px`}}>
                            <FormattedMessage id="Dashboard"/>
                        </Button>
                    </StyledButtonLink>
                </div>
            </div>
        </Grid>);

        return (<Grid container spacing={8} direction="row" alignItems="center" justify="center">
            {this.props.createSuccess ? (successPanel) : (formPanel)}
        </Grid>);
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    loading: makeSelectCreateConfigurationLoading(),
    createSuccess: makeSelectCreateConfigurationSuccess(),
    updateSuccess: makeSelectUpdateConfigurationSuccess(),
    error: makeSelectCreateConfigurationError(),
    configurations: makeSelectConfigurations()
});

export default connect(mapStateToProps)(injectIntl(ConfigurationPage));