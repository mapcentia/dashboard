import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { checkAuthorizationSuccess, checkAuthorizationFailure, signInSuccess, signInFailure } from 'containers/App/actions';

import config from '../../config';
import { CHECK_AUTHORIZATION_REQUEST, SIGN_IN_REQUEST } from 'containers/App/constants';

// Initial authorization check
const checkAuthorizationCall = () => {
    return axios.get(`${config.apiUrl}session`, { withCredentials: true });
};

export function* checkAuthorizationGenerator() {
    try {
        const result = yield call(checkAuthorizationCall);

        console.log(`### checkAuthorizationGenerator`, result);

        yield put(checkAuthorizationSuccess());
    } catch (err) {
        yield put(checkAuthorizationFailure());
    }
}

// Sign in 
const signInCall = (action) => {
    console.log(`### credentials`, action.payload);
    return axios.post(`${config.apiUrl}session/start`, action.payload, {withCredentials: true});
};

export function* signInGenerator(credentials) {
    try {
        const result = yield call(signInCall, credentials);
        yield put(signInSuccess(result));
    } catch (err) {
        yield put(signInFailure());
    }
}

export default function* checkAuthorization() {
    yield takeLatest(CHECK_AUTHORIZATION_REQUEST, checkAuthorizationGenerator);
    yield takeLatest(SIGN_IN_REQUEST, signInGenerator);
}
