import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { checkAuthorizationSuccess, checkAuthorizationFailure,
    signInSuccess, signInFailure,
    createUserSuccess, createUserFailure,
    updateUserSuccess, updateUserFailure, updateUserPasswordSuccess,
    deleteUserSuccess, deleteUserFailure,
    getSubusersRequest, getSubusersSuccess, getSubusersFailure } from 'containers/App/actions';

import { CHECK_AUTHORIZATION_REQUEST, CHECK_AUTHORIZATION_SUCCESS,
    SIGN_IN_REQUEST, SIGN_OUT,
    CREATE_USER_REQUEST, UPDATE_USER_REQUEST, DELETE_USER_REQUEST,
    GET_SUBUSERS_REQUEST } from 'containers/App/constants';

import {checkAuthorizationCall, signInCall, createUserCall, updateUserCall, getSubusersCall, deleteUserCall} from 'api';

export function* checkAuthorizationGenerator() {
    try {
        const response = yield call(checkAuthorizationCall);
        yield put(checkAuthorizationSuccess(response.data.data));
    } catch (err) {
        console.log(err);
        yield put(checkAuthorizationFailure());
    }
}

export function* signInGenerator(credentials) {
    try {
        const result = yield call(signInCall, credentials);
        yield put(signInSuccess(result.data.data));

        if (result.data.data.passwordExpired) {
            yield put(push(`/account`));
        } else {
            yield put(push(`/`));
        }
    } catch (err) {
        yield put(signInFailure());
    }
}

export function* createUserGenerator(data) {
    const response = yield call(createUserCall, data);
    try {
        if (response.status && response.status === 200) {
            yield put(createUserSuccess(response.data.data.screenname));
        } else {
            if (response.data && response.data.errorCode) {
                yield put(createUserFailure(response.data.errorCode));
            } else {
                yield put(createUserFailure());
            }
        }
    } catch(err) {
        console.error(err);
        yield put(createUserFailure());
    }
}

export function* signOutGenerator() {
    yield put(push(`/sign-in`));
}

export function* updateUserGenerator(action) {
    const response = yield call(updateUserCall, action);
    try {
        if (response.status === 200) {
            yield put(updateUserSuccess());
            if (action.payload.data.onSuccess) action.payload.data.onSuccess();
            if (action.payload.data && action.payload.data.oldPassword && action.payload.data.newPassword) {
                yield put(updateUserPasswordSuccess());
            }
        } else {
            if (response.data && response.data.errorCode) {
                yield put(updateUserFailure(response.data.errorCode));
            } else {
                yield put(updateUserFailure());
            }
        }
    } catch(err) {
        console.error(err);
        yield put(updateUserFailure());
    }
}

export function* deleteUserGenerator(action) {
    const response = yield call(deleteUserCall, action);
    try {
        yield put(deleteUserSuccess());
        yield put(getSubusersRequest(action));
    } catch(err) {
        console.error(err);
        yield put(deleteUserFailure());
    }
}

export function* getSubusersGenerator(action) {
    const response = yield call(getSubusersCall, action);
    try {
        yield put(getSubusersSuccess(response.data.data));
    } catch(err) {
        yield put(getSubusersFailure());
    }
}

export function* forceUserUpdateGenerator(action) {
    if (action.payload.passwordExpired) {
        yield put(push(`/account`));
    }
}

export default function* checkAuthorization() {
    yield takeLatest(CHECK_AUTHORIZATION_REQUEST, checkAuthorizationGenerator);
    yield takeLatest(SIGN_IN_REQUEST, signInGenerator);
    yield takeLatest(SIGN_OUT, signOutGenerator);
    yield takeLatest(CREATE_USER_REQUEST, createUserGenerator);
    yield takeLatest(UPDATE_USER_REQUEST, updateUserGenerator);
    yield takeLatest(DELETE_USER_REQUEST, deleteUserGenerator);
    yield takeLatest(CHECK_AUTHORIZATION_SUCCESS, forceUserUpdateGenerator);
    yield takeLatest(GET_SUBUSERS_REQUEST, getSubusersGenerator);
    
}

