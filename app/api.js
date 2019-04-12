/**
 * Interacting with GC2 REST API
 */

import axios from 'axios';
import config from 'config';
import Joi from 'joi-browser';

const checkAuthorizationCall = () => {
    return axios.get(`${config.apiUrl}session`, { withCredentials: true });
};

const signInCall = (action) => {
    return axios.post(`${config.apiUrl}session/start`, action.payload, {withCredentials: true});
};

const createUserCall = (action) => {

    console.log(`### createUserCall`, action);
    
    const schema = Joi.object({
        data: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(3).required(),
            usergroup: Joi.string().allow(``).optional()
        })
    });

    const {error} = Joi.validate(action.payload, schema);
    if (error) {
        console.error(error);
        return Promise.reject(`Invalid data was provided`);
    } else {
        return axios.post(`${config.apiUrl}user`, action.payload.data, {
            withCredentials: true,
            validateStatus: (status) => {
                return status >= 200 && status <= 400;
            }
        });
    }
};

const updateUserCall = (action) => {
    let data = {};
    if (action.payload.currentPassword) {
        data.currentPassword = action.payload.data.oldPassword;
        data.password = action.payload.data.newPassword;
    } else {
        if (action.payload.data.password) data.password = action.payload.data.password;
        if (action.payload.data.usergroup) data.usergroup = (action.payload.data.usergroup === `null` ? `` : action.payload.data.usergroup);
    }

    return axios.put(`${config.apiUrl}user/${action.payload.screenName}`, data, {withCredentials: true});
};

const getSubusersCall = (action) => {
    return axios.get(`${config.apiUrl}user/${action.payload.screenName}/subusers`, {withCredentials: true});
}

const deleteUserCall = (action) => {
    return axios.delete(`${config.apiUrl}user/${action.payload.screenName}`, {withCredentials: true});
}


export {checkAuthorizationCall, signInCall, createUserCall, updateUserCall, getSubusersCall, deleteUserCall};