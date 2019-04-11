import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import {injectIntl} from 'react-intl';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Table from '@material-ui/core/Table';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import indigo from '@material-ui/core/colors/indigo';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import { makeSelectUser, makeSelectSubusers } from 'containers/App/selectors';
import { getSubusersRequest } from 'containers/App/actions';

import SnackbarContent from 'components/SnackbarContent';
import { passwordIsStrongEnough } from 'utils/shared';

export class SubuserPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            added: true,
            screenName: ``,
            email: ``,
            password1: ``,
            password2: ``,
            createSchema: false,
            group: `null`,
        }
    }

    componentWillMount() {
        if (!this.props.subusers) {
            this.props.dispatch(getSubusersRequest({screenName: this.props.user.screenName}));
        }
    }

    render() {

        console.log(this.props);

        let menuItems = [];
        if (this.props.subusers) {
            this.props.subusers.map((item, index) => {
                menuItems.push(<MenuItem key={`option_${index}`} value={item.screenname}>{item.screenname}</MenuItem>);
            });
        };

        return (<div>
                <Grid container spacing={24}>
                    <Grid item md={12}>
                        <Typography variant="h6" color="inherit">
                            <FormattedMessage id="Create new subuser" />
                        </Typography>
                        <Typography variant="body1" color="inherit">
                            <FormattedMessage id="containers.SubuserPage.description" />
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item md={6}>
                        <div>
                            <TextField
                                label={this.props.intl.formatMessage({id: `Name`})}
                                value={this.state.screenName}
                                onChange={() => { this.setState({ screenName: event.target.value}) }}/>
                        </div>
                        <div>
                            <TextField
                                label={this.props.intl.formatMessage({id: `Email address`})}
                                value={this.state.email}
                                onChange={() => { this.setState({ screenName: event.target.value}) }}/>
                        </div>
                    </Grid>
                    <Grid item md={6}>
                        <div>
                            <TextField
                                type="password"
                                label={this.props.intl.formatMessage({id: `Password`})}
                                value={this.state.password1}
                                onChange={() => { this.setState({ screenName: event.target.value}) }}/>
                        </div>
                        <div>
                            <TextField
                                type="password"
                                label={this.props.intl.formatMessage({id: `Retype password`})}
                                value={this.state.password2}
                                onChange={() => { this.setState({ screenName: event.target.value}) }}/>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={24}>
                    <Grid item md={12}>
                        <Typography variant="body1" color="inherit">
                            <FormattedMessage id="containers.SubuserPage.descriptionCreateSchema" />
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item md={12} style={{textAlign: `right`}}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={this.state.createSchema}
                                onChange={(event) => { this.setState({createSchema: event.target.checked}) }}
                                value="1"/>}
                            label={this.props.intl.formatMessage({id: `Create schema`})}/>
                    </Grid>
                </Grid>

                <Grid container spacing={24}>
                    <Grid item md={12}>
                        <Typography variant="body1" color="inherit">
                            <FormattedMessage id="containers.SubuserPage.descriptionInheritPrivileges" />
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item md={12} style={{textAlign: `right`}}>
                        <FormControl>
                            <Select
                                value={this.state.group}
                                onChange={(event) => { this.setState({group: event.target.value})}}>
                                <MenuItem value="null">{this.props.intl.formatMessage({id: `Do not inherit`})}</MenuItem>
                                {menuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                
                <Grid container spacing={24}>
                    <Grid item md={12}>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary">
                            <FormattedMessage id="Save" />
                        </Button>
                    </Grid>
                </Grid>

            <div>

            </div>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    subusers: makeSelectSubusers()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(injectIntl(SubuserPage));
