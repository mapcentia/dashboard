import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { checkAuthorizationSuccess, checkAuthorizationFailure,
    signInSuccess, signInFailure,
    signUpSuccess, signUpFailure,
    updateUserSuccess, updateUserFailure, updateUserPasswordSuccess,
    getSubusersRequest, getSubusersSuccess, getSubusersFailure,
    createSubuserSuccess, createSubuserFailure,
    updateSubuserSuccess, updateSubuserFailure,
    deleteSubuserSuccess, deleteSubuserFailure } from 'containers/App/actions';

import { CHECK_AUTHORIZATION_REQUEST, CHECK_AUTHORIZATION_SUCCESS,
    SIGN_IN_REQUEST, SIGN_OUT, SIGN_UP_REQUEST, UPDATE_USER_REQUEST,
    CREATE_SUBUSER_REQUEST, UPDATE_SUBUSER_REQUEST, DELETE_SUBUSER_REQUEST,
    GET_SUBUSERS_REQUEST } from 'containers/App/constants';

import {checkAuthorizationCall, signInCall, signUpCall, updateUserCall,
    getSubusersCall, createSubuserCall, updateSubuserCall, deleteSubuserCall} from 'api';

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

export function* getSubusersGenerator(action) {
    const response = yield call(getSubusersCall, action);
    try {
        yield put(getSubusersSuccess(response.data.data));
    } catch(err) {
        yield put(getSubusersFailure());
    }
}

export function* createSubuserGenerator(action) {
    const response = yield call(createSubuserCall, action);
    try {
        yield put(createSubuserSuccess(response.data.data));
    } catch(err) {
        yield put(createSubuserFailure());
    }
}

export function* updateSubuserGenerator(action) {
    const response = yield call(updateSubuserCall, action);
    try {
        yield put(updateSubuserSuccess(response.data.data));
    } catch(err) {
        yield put(updateSubuserFailure());
    }
}

export function* deleteSubuserGenerator(action) {
    yield call(deleteSubuserCall, action);
    try {
        yield put(deleteSubuserSuccess());
        yield put(getSubusersRequest(action));
    } catch(err) {
        yield put(deleteSubuserFailure());
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
    yield takeLatest(SIGN_UP_REQUEST, signUpGenerator);
    yield takeLatest(SIGN_OUT, signOutGenerator);
    yield takeLatest(UPDATE_USER_REQUEST, updateUserGenerator);
    yield takeLatest(CHECK_AUTHORIZATION_SUCCESS, forceUserUpdateGenerator);
    yield takeLatest(GET_SUBUSERS_REQUEST, getSubusersGenerator);
    yield takeLatest(CREATE_SUBUSER_REQUEST, createSubuserGenerator);
    yield takeLatest(UPDATE_SUBUSER_REQUEST, updateSubuserGenerator);
    yield takeLatest(DELETE_SUBUSER_REQUEST, deleteSubuserGenerator);
}

