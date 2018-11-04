import { all, fork } from "redux-saga/effects";
import fetchUser from "./saga";

export default function* root() {
    yield all([
        fork(fetchUser)
    ]);
}