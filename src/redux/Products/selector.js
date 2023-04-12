import { createSelector } from "reselect";
//workerconst
const getData = (state) => {
  return state.transactionReducer.transactions;
};
//watcherexport
export const getDataSelector = createSelector(
  getData,
  (SetProductList) => SetProductList
);