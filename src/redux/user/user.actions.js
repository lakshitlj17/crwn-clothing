import userEvent from "@testing-library/user-event";

export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});