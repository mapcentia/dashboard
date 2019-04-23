import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectIsAuthenticating = () => createSelector(selectGlobal, globalState => globalState.isAuthenticating);
const makeSelectIsAuthenticated = () => createSelector(selectGlobal, globalState => globalState.isAuthenticated);
const makeSelectUser = () => createSelector(selectGlobal, globalState => globalState.user);

const makeSelectSigningIn = () => createSelector(selectGlobal, globalState => globalState.signingIn);
const makeSelectSigningInError = () => createSelector(selectGlobal, globalState => globalState.signingInError);

const makeSelectCreateUser = () => createSelector(selectGlobal, globalState => globalState.createUser);
const makeSelectCreateUserSuccess = () => createSelector(selectGlobal, globalState => globalState.createUserSuccess);
const makeSelectCreateUserSuccessUserName = () => createSelector(selectGlobal, globalState => globalState.createUserSuccessUserName);
const makeSelectCreateUserError = () => createSelector(selectGlobal, globalState => globalState.createUserError);
const makeSelectCreateUserErrorCode = () => createSelector(selectGlobal, globalState => globalState.createUserErrorCode);

const makeSelectUpdateUserSuccess = () => createSelector(selectGlobal, globalState => globalState.updateUserSuccess);
const makeSelectUpdateUserSuccessUserName = () => createSelector(selectGlobal, globalState => globalState.updateUserSuccessUserName);
const makeSelectUpdateUserError = () => createSelector(selectGlobal, globalState => globalState.updateUserError);
const makeSelectUpdateUserErrorCode = () => createSelector(selectGlobal, globalState => globalState.updateUserErrorCode);

const makeSelectIsRequesting = () => createSelector(selectGlobal, globalState => globalState.isRequesting);
const makeSelectSubusers = () => createSelector(selectGlobal, globalState => globalState.subusers);
const makeSelectSchemas = () => createSelector(selectGlobal, globalState => globalState.schemas);
const makeSelectConfigurations = () => createSelector(selectGlobal, globalState => globalState.configurations);

export {
    selectGlobal,
    makeSelectIsAuthenticating,
    makeSelectIsAuthenticated,
    makeSelectUser,
    makeSelectSigningIn,
    makeSelectSigningInError,
    makeSelectCreateUser,

    makeSelectCreateUserSuccess,
    makeSelectCreateUserSuccessUserName,
    makeSelectCreateUserError,
    makeSelectCreateUserErrorCode,

    makeSelectUpdateUserSuccess,
    makeSelectUpdateUserSuccessUserName,
    makeSelectUpdateUserError,
    makeSelectUpdateUserErrorCode,

    makeSelectIsRequesting,
    makeSelectSubusers,
    makeSelectSchemas,
    makeSelectConfigurations
};
