import { fromJS } from 'immutable';

import { CHECK_AUTHORIZATION_REQUEST, CHECK_AUTHORIZATION_SUCCESS, CHECK_AUTHORIZATION_FAILURE,
    SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from 'containers/App/constants';

const initialState = fromJS({
    isAuthenticating: true,
    isAuthenticated: false,
    user: false,
    signingIn: false,
    signingInSuccess: false,
    signingInError: false,
});

function appReducer(state = initialState, action) {
    
    console.log(`### action`, action);

    switch (action.type) {
        case CHECK_AUTHORIZATION_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                isAuthenticated: false,
                user: false
            });
        case CHECK_AUTHORIZATION_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                user: action.payload
            });
        case CHECK_AUTHORIZATION_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                user: false
            });
        case SIGN_IN_REQUEST:
            return Object.assign({}, state, {
                signingIn: true,
                signingInSuccess: false,
                signingInError: false,
            });
        case SIGN_IN_SUCCESS:
            return Object.assign({}, state, {
                signingIn: false,
                signingInSuccess: true,
                signingInError: false,
                user: {
                    email: action.payload.email,
                    passwordExpired: action.payload.passwordExpired,
                    screenName: action.payload.screen_name,
                    subuser: action.payload.subuser
                },
                isAuthenticated: true
            });
        case SIGN_IN_FAILURE:
            return Object.assign({}, state, {
                signingIn: false,
                signingInSuccess: false,
                signingInError: `invalidCredentialsWereProvided`,
                user: false
            });
        default:
            return state;
    }
}

export default appReducer;
