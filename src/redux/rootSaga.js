import { all } from 'redux-saga/effects'
import expenseSaga from "./Products/saga"

export default function* () {
    yield all([
        expenseSaga(),
    ]);
}