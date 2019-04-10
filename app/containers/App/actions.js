import Cookies from 'universal-cookie';
import { CHECK_AUTHORIZATION_REQUEST, CHECK_AUTHORIZATION_SUCCESS, CHECK_AUTHORIZATION_FAILURE } from 'containers/App/constants';
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_PASSWORD_SUCCESS } from 'containers/App/constants';

const cookies = new Cookies();

const normalizeUser = (userData) => {
    if (!userData.email || !userData.screen_name ||
        `passwordExpired` in userData === false || `subuser` in userData === false) {
        console.error(`User data is invalid`, userData);
        throw new Error(`Unexpected format of the user data`);
    }

    let data = {
        email: userData.email,
        passwordExpired: userData.passwordExpired,
        screenName: userData.screen_name,
        sessionId: userData.session_id,
        subuser: userData.subuser,
    };

    return data;
}

export function updateUserRequest(screenName, data) {
    return { type: UPDATE_USER_REQUEST, payload: {screenName, data} };
}

export function updateUserSuccess(payload) {
    return { type: UPDATE_USER_SUCCESS, payload};
}

export function updateUserFailure(payload = false) {
    return { type: UPDATE_USER_FAILURE, payload };
}

export function updateUserPasswordSuccess() {
    return { type: UPDATE_USER_PASSWORD_SUCCESS };
}

export function checkAuthorizationRequest() {
    if (cookies.get('PHPSESSID')) {
        // There is a chance that session is still valid, checking
        return { type: CHECK_AUTHORIZATION_REQUEST };
    } else {
        // No session cookie, so no session for sure
        return { type: CHECK_AUTHORIZATION_FAILURE };
    }
}

// Checking authorization status
export function checkAuthorizationSuccess(payload) {
    return { type: CHECK_AUTHORIZATION_SUCCESS, payload: normalizeUser(payload) };
}

export function checkAuthorizationFailure() {
    return { type: CHECK_AUTHORIZATION_FAILURE };
}

export function signInRequest(payload) {
    return { type: SIGN_IN_REQUEST, payload };
}

// Signing in
export function signInSuccess(payload) {
    cookies.set('PHPSESSID', payload.session_id);
    return { type: SIGN_IN_SUCCESS, payload: normalizeUser(payload) };
}

export function signInFailure() {
    return { type: SIGN_IN_FAILURE };
}

// Signing up
export function signUpRequest(payload) {
    return { type: SIGN_UP_REQUEST, payload };
}

export function signUpSuccess(payload) {
    return { type: SIGN_UP_SUCCESS, payload};
}

export function signUpFailure(payload = false) {
    return { type: SIGN_UP_FAILURE, payload };
}

// Signing out
export function signOut() {
    cookies.remove('PHPSESSID');
    return { type: SIGN_OUT };
}
