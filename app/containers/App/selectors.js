/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectIsAuthenticating = () => createSelector(selectGlobal, globalState => globalState.isAuthenticating);
const makeSelectIsAuthenticated = () => createSelector(selectGlobal, globalState => globalState.isAuthenticated);
const makeSelectUser = () => createSelector(selectGlobal, globalState => globalState.user);

export {
    selectGlobal,
    makeSelectIsAuthenticating,
    makeSelectIsAuthenticated,
    makeSelectUser,
};
