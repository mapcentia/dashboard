import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import {injectIntl} from 'react-intl';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import indigo from '@material-ui/core/colors/indigo';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinkIcon from '@material-ui/icons/Link';

import config from 'config';
import { makeSelectUser, makeSelectConfigurations } from 'containers/App/selectors';
import { getConfigurationsRequest, deleteConfigurationRequest } from 'containers/App/actions';

import StyledButtonLink from 'components/StyledButtonLink';

export class ConfigurationsPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            configurationsFilter: ``
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getConfigurationsRequest({ userId: this.props.user.screenName}));
    }

    handleDelete(key, name) {
        if (confirm(this.props.intl.formatMessage({id: `Delete`}) + ` ${name}?`)) {
            this.props.dispatch(deleteConfigurationRequest({
                userId: this.props.user.screenName,
                configurationId: key
            }));
        }
    }

    render() {
        let configurationsFilter = false;
        let configurationsComponents = [];
        if (this.props.configurations) {
            configurationsFilter = (<Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <SearchIcon />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        placeholder={this.props.intl.formatMessage({id: `Filter`})}
                        value={this.state.configurationsFilter}
                        onChange={(event) => { this.setState({ configurationsFilter: event.target.value }) }} />
                </Grid>
            </Grid>);

            this.props.configurations.map((item, index) => {
                let parsedData = JSON.parse(item.value);

                if (this.state.configurationsFilter === `` || (parsedData.name.indexOf(this.state.configurationsFilter) > -1 || parsedData.name.indexOf(this.state.configurationsFilter) > -1)) {
                    let url = config.apiUrl + `configuration/${this.props.user.screenName}/${item.key}.json`;
                    configurationsComponents.push(<ExpansionPanel key={`configuration_card_${index}`} defaultExpanded={false}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography><LinkIcon/> {parsedData.name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div style={{width: `100%`}}>
                                <div>
                                    <TextField
                                        id="configuration-link"
                                        label="Link"
                                        fullWidth={true}
                                        value={url}
                                        margin="normal"
                                        style={{marginTop: `0px`}}/>
                                </div>
                                <div style={{textAlign: `right`}}>
                                    <CopyToClipboard text={url}>
                                        <Button variant="contained" size="small" style={{marginRight: `10px`}}>
                                            <FormattedMessage id="Copy link"/>
                                        </Button>
                                    </CopyToClipboard>
                                    <StyledButtonLink to={`/configuration/edit/${item.key}`} style={{marginRight: `10px`}}>
                                        <Button color="primary" variant="contained" size="small">
                                            <FormattedMessage id="Edit"/>
                                        </Button>
                                    </StyledButtonLink>
                                        <Button color="secondary" variant="contained" size="small" onClick={() => { this.handleDelete(item.key, parsedData.name)}}>
                                            <FormattedMessage id="Delete"/>
                                        </Button>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>);
                }
            });
        }

        if (configurationsComponents.length === 0) {
            if (this.state.configurationsFilter === ``) {
                configurationsComponents = (<p>
                    <FormattedMessage id="No configurations yet"/>
                </p>);
            } else {
                configurationsComponents = (<p>
                    <FormattedMessage id="No configurations found"/>
                </p>);
            }
        }

        return (<div>
            <div>
                <Grid container spacing={8} direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item>
                        <StyledButtonLink to="/configuration/add">
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                style={{marginLeft: `10px`}}>
                                <FormattedMessage id="Add" />
                            </Button>
                        </StyledButtonLink>
                    </Grid>
                    <Grid item>{configurationsFilter}</Grid>
                </Grid>
            </div>
            <div style={{paddingTop: `10px`}}>{configurationsComponents}</div>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    configurations: makeSelectConfigurations()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(injectIntl(ConfigurationsPanel));
