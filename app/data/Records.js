import { Record } from 'immutable';

export const User = Record({
    id: null,
    authToken: null,
    email: null,
    password: null,
    confirmPassword: null,
    firstName: null,
    lastName: null
});