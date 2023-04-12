import  ACTION_TYPES  from "./actionTypes";

const {
    ADD_TRANSACTION_LIST_START ,
    ADD_TRANSACTION_LIST_SUCCESS,
    ADD_TRANSACTION_LIST_FAILURE,
    ADD_LISTS_START,
    ADD_LISTS_SUCCESS,
    ADD_LISTS_FAILURE,
    DELETE_TRANSACTION,
    EDIT_TRANSACTION,
}=ACTION_TYPES;

export const addTransactionStart = (transaction) => {
    return {
    type: ADD_TRANSACTION_LIST_START,
    payload: transaction,
    };
    };
export const addTransactionSuccess = (transaction) => {
    return {
    type: ADD_TRANSACTION_LIST_SUCCESS,
    payload: transaction,
    };
    };
export const addTransactionFailure = (transaction) => {
    return {
    type: ADD_TRANSACTION_LIST_FAILURE,
    payload: transaction,
    };
    };
export const addListsStart = (payload) => ({
    type: ADD_LISTS_START,
    payload,
});
export const addListsSuccess = (data) => {
    return {
    type: ADD_LISTS_SUCCESS,
    payload: data,
    };
    };
export const addListsFailure = (data) => {
    return {
    type: ADD_LISTS_FAILURE,
    payload: data,
    };
    };
export const deleteTransaction = (id) => {
    return {
        type: DELETE_TRANSACTION,
        payload: id,
    };
    };
export const editTransaction = (data) => {
    return {
    type: EDIT_TRANSACTION,
    payload: data,
    };
    };