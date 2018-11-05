import { call, put, takeEvery } from 'redux-saga/effects'
import request from "utils/request.js";

function* fetchUser(action) {
    yield takeEvery("FETCH_USER", function* (action) {
        const user = yield call(request, { url: "/api/getUsers" });
        yield put({ type: "FETCH_NAMES", payload: user });
    });
}
function* addRecord(action) {
    yield takeEvery("ADD_RECORD", function* (action) {
        yield call(request, { url: "/api/add/", options: { method: "POST", body: JSON.stringify(action.payload) } });
        const user = yield call(request, { url: "/api/getUsers", method: "GET" });
        yield put({ type: "FETCH_NAMES", payload: user });
    });
}
function* updateRecord(action) {
    yield takeEvery("UPDATE_RECORD", function* (action) {
        yield call(request, { url: "/api/update/", options: { method: "POST", body: JSON.stringify(action.payload) } });
        const user = yield call(request, { url: "/api/getUsers" });
        yield put({ type: "FETCH_NAMES", payload: user });
    });
}

function* deleteRecord(action) {
    yield takeEvery("DELETE_RECORD", function* (action) {
        const id = action.payload;
        // delete a record, then get updated record list
        yield call(request, { url: `/api/delete/${id}`, options: { method: "DELETE" } });
        const user = yield call(request, { url: "/api/getUsers" });
        yield put({ type: "FETCH_NAMES", payload: user });
    });
}

export {
    fetchUser,
    addRecord,
    deleteRecord,
    updateRecord
}
