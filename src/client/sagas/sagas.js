import { all, fork } from "redux-saga/effects";
import { fetchUser, deleteRecord } from "./saga";

export default function* root() {
    yield all([
        fork(fetchUser),
        fork(deleteRecord)
    ]);
}