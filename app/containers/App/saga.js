import axios from 'axios';
import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { checkAuthorizationSuccess, checkAuthorizationFailure, signInSuccess, signInFailure, signUpSuccess, signUpFailure } from 'containers/App/actions';

import config from '../../config';
import { CHECK_AUTHORIZATION_REQUEST, SIGN_IN_REQUEST, SIGN_OUT,
    SIGN_UP_REQUEST } from 'containers/App/constants';

// Initial authorization check
const checkAuthorizationCall = () => {
    return axios.get(`${config.apiUrl}session`, { withCredentials: true });
};

export function* checkAuthorizationGenerator() {
    try {
        const response = yield call(checkAuthorizationCall);
        yield put(checkAuthorizationSuccess(response.data.data));
    } catch (err) {
        yield put(checkAuthorizationFailure());
    }
}

// Sign in 
const signInCall = (action) => {
    return axios.post(`${config.apiUrl}session/start`, action.payload, {withCredentials: true});
};

export function* signInGenerator(credentials) {
    try {
        const result = yield call(signInCall, credentials);
        yield put(signInSuccess(result.data.data));
        yield put(push(`/`));
    } catch (err) {
        yield put(signInFailure());
    }
}

// Sign in 
const signUpCall = (action) => {
    return axios.post(`${config.apiUrl}user`, action.payload, {
        validateStatus: (status) => {
            return status >= 200 && status <= 400;
        }
    });
};

export function* signUpGenerator(data) {
    const response = yield call(signUpCall, data);
    try {
        if (response.status === 200) {
            yield put(signUpSuccess(response.data.data.screenname));
        } else {
            if (response.data && response.data.errorCode) {
                yield put(signUpFailure(response.data.errorCode));
            } else {
                yield put(signUpFailure());
            }
        }
    } catch(err) {
        yield put(signUpFailure());
    }
}

export function* signOutGenerator() {
    yield put(push(`/sign-in`));
}

export default function* checkAuthorization() {
    yield takeLatest(CHECK_AUTHORIZATION_REQUEST, checkAuthorizationGenerator);
    yield takeLatest(SIGN_IN_REQUEST, signInGenerator);
    yield takeLatest(SIGN_UP_REQUEST, signUpGenerator);
    yield takeLatest(SIGN_OUT, signOutGenerator);
}
