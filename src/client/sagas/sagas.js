import { all, fork } from "redux-saga/effects";
import { fetchUser, addRecord, deleteRecord, updateRecord } from "./saga";

export default function* root() {
    yield all([
        fork(fetchUser),
        fork(deleteRecord),
        fork(updateRecord),
        fork(addRecord)
    ]);
}