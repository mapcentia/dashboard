import { fromJS } from 'immutable';

import { SIGN_OUT, CHECK_AUTHORIZATION_REQUEST, CHECK_AUTHORIZATION_SUCCESS, CHECK_AUTHORIZATION_FAILURE,
    SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE,
    CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_PASSWORD_SUCCESS,
    GET_SUBUSERS_REQUEST, GET_SUBUSERS_SUCCESS, GET_SUBUSERS_FAILURE,
    GET_SCHEMAS_REQUEST, GET_SCHEMAS_SUCCESS, GET_SCHEMAS_FAILURE,
    CREATE_UPDATE_USER_RESET } from 'containers/App/constants';

const initialState = fromJS({
    isAuthenticating: true,
    isAuthenticated: false,
    user: false,

    isRequesting: false,

    signingIn: false,
    signingInSuccess: false,
    signingInError: false,

    createUser: false,
    createUserSuccess: false,
    createUserSuccessUserName: false,
    createUserError: false,
    createUserErrorCode: ``,

    updateUser: false,
    updateUserSuccess: false,
    updateUserSuccessUserName: false,
    updateUserError: false,
    updateUserErrorCode: ``,

    subusers: [],
    schemas: []
});

function appReducer(state = initialState, action) {
    
    console.log(`### action`, action);

    switch (action.type) {
        case SIGN_OUT:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                user: false
            });
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
                isRequesting: true,
                signingIn: true,
                signingInSuccess: false,
                signingInError: false,
            });
        case SIGN_IN_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                signingIn: false,
                signingInSuccess: true,
                signingInError: false,
                user: action.payload,
                isAuthenticated: true
            });
        case SIGN_IN_FAILURE:
            return Object.assign({}, state, {
                isRequesting: false,
                signingIn: false,
                signingInSuccess: false,
                signingInError: true,
                user: false
            });
        case CREATE_USER_REQUEST:
            return Object.assign({}, state, {
                isRequesting: true,
                createUser: true,
                createUserSuccess: false,
                createUserSuccessUserName: false,
                createUserError: false,
                createUserErrorCode: ``
            });
        case CREATE_USER_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                createUser: false,
                createUserSuccess: true,
                createUserSuccessUserName: action.payload,
                createUserError: false,
            });
        case CREATE_USER_FAILURE:
            return Object.assign({}, state, {
                isRequesting: false,
                createUser: false,
                createUserSuccess: false,
                createUserSuccessUserName: false,
                createUserError: true,
                createUserErrorCode: (action.payload ? action.payload : false),
            });
        case UPDATE_USER_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {passwordExpired: false})
            });
        case UPDATE_USER_REQUEST:
            return Object.assign({}, state, {
                isRequesting: true,
            });
        case UPDATE_USER_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                updateUser: false,
                updateUserSuccess: true,
                updateUserSuccessUserName: action.payload,
                updateUserError: false,
            });
        case UPDATE_USER_FAILURE:
            return Object.assign({}, state, {
                isRequesting: false,
                updateUser: false,
                updateUserSuccess: false,
                updateUserSuccessUserName: false,
                updateUserError: true,
                updateUserErrorCode: (action.payload ? action.payload : false),
            });
        case CREATE_UPDATE_USER_RESET:
            return Object.assign({}, state, {
                isRequesting: false,

                createUser: initialState.createUser,
                createUserSuccess: initialState.createUserSuccess,
                createUserSuccessUserName: initialState.createUserSuccessUserName,
                createUserError: initialState.createUserError,
                createUserErrorCode: initialState.createUserErrorCode,

                updateUser: initialState.updateUser,
                updateUserSuccess: initialState.updateUserSuccess,
                updateUserSuccessUserName: initialState.updateUserSuccessUserName,
                updateUserError: initialState.updateUserError,
                updateUserErrorCode: initialState.updateUserErrorCode,
            });
        case GET_SUBUSERS_REQUEST:
            return Object.assign({}, state, {
                isRequesting: true,
            });
        case GET_SUBUSERS_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                subusers: action.payload
            });
        case GET_SUBUSERS_FAILURE:
            return Object.assign({}, state, {
                isRequesting: false,
            });
        case GET_SCHEMAS_REQUEST:
            return Object.assign({}, state, {
                isRequesting: true,
            });
        case GET_SCHEMAS_SUCCESS:
            return Object.assign({}, state, {
                isRequesting: false,
                schemas: action.payload
            });
        case GET_SCHEMAS_FAILURE:
            return Object.assign({}, state, {
                isRequesting: false,
            });
        default:
            return state;
    }
}

export default appReducer;
