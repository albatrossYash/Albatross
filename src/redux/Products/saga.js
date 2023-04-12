import { all, take, call, put } from "redux-saga/effects";
import ACTION_TYPES from "./actionTypes";
import * as ACTION from "./action";
import * as PRODUCT_API from "./../../services/expences";

const { ADD_TRANSACTION_LIST_START } = ACTION_TYPES;

function* addExpenseSaga(payload) {
  try {
    const { data } = yield call(PRODUCT_API.productAsync, payload);
    yield put(ACTION.addTransactionSuccess({ data }));
    
  } catch ({ message }) {
    yield put(ACTION.addTransactionFailure({ message }));
  }
}
function* expenseWatcher() {
  
  while (true) {
    const { payload } = yield take(ADD_TRANSACTION_LIST_START);
    yield call(addExpenseSaga, payload);
  }
}
export default function* () {
  yield all([expenseWatcher()]);
}