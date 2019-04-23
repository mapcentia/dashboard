import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import {injectIntl} from 'react-intl';

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
import ExploreIcon from '@material-ui/icons/Explore';

import { makeSelectUser, makeSelectConfigurations } from 'containers/App/selectors';
import { getConfigurationsRequest } from 'containers/App/actions';

import StyledButtonLink from 'components/StyledButtonLink';

export class ConfigurationsPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            configurationsFilter: ``
        };
    }

    componentWillMount() {
        this.props.dispatch(getConfigurationsRequest(this.props.user.screenName));
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
                if (this.state.configurationsFilter === `` || (item.schema.indexOf(this.state.configurationsFilter) > -1 || item.schema.indexOf(this.state.configurationsFilter) > -1)) {
                    let databaseName = ``;
                    if (this.props.user.parentDb) {
                        databaseName = this.props.user.parentDb;
                    } else {
                        databaseName = this.props.user.screenName;
                    }

                    let numberOfLayers = (item.count ? item.count : 0);
                    configurationsComponents.push(<ExpansionPanel key={`configuration_card_${index}`} defaultExpanded={true}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography><ExploreIcon/> {item.schema}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={8} direction="row">
                                <Grid item style={{flex: `0 0 50%`}}>
                                    <Typography>
                                        <FormattedMessage id="Number of layers"/>: <strong>{numberOfLayers}</strong>
                                    </Typography>                                    
                                </Grid>
                                <Grid item style={{flex: `0 0 50%`, textAlign: `right`}}>
                                    <StyledButtonLink to={`/admin/${databaseName}/${item.schema}`} style={{marginRight: `10px`}}>
                                        <Button variant="contained" size="small">
                                            Vidi
                                        </Button>
                                    </StyledButtonLink>
                                    <StyledButtonLink to={`/admin/${databaseName}/${item.schema}`}>
                                        <Button color="primary" variant="contained" size="small">
                                            <SettingsIcon />
                                        </Button>
                                    </StyledButtonLink>
                                </Grid>
                            </Grid>
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
            <div>{configurationsComponents}</div>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    configurations: makeSelectConfigurations()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(injectIntl(ConfigurationsPanel));
