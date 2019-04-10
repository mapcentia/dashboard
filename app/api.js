/**
 * Interacting with GC2 REST API
 */

import axios from 'axios';
import config from 'config';

const checkAuthorizationCall = () => {
    return axios.get(`${config.apiUrl}session`, { withCredentials: true });
};

const signInCall = (action) => {
    return axios.post(`${config.apiUrl}session/start`, action.payload, {withCredentials: true});
};

const signUpCall = (action) => {
    return axios.post(`${config.apiUrl}user`, action.payload, {
        validateStatus: (status) => {
            return status >= 200 && status <= 400;
        }
    });
};

const updateUserCall = (action) => {
    return axios.put(`${config.apiUrl}user/${action.payload.screenName}`, {
        currentPassword: action.payload.data.oldPassword,
        password: action.payload.data.newPassword
    }, {withCredentials: true});
};

export {checkAuthorizationCall, signInCall, signUpCall, updateUserCall};