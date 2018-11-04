import { call, put, takeEvery } from 'redux-saga/effects'
import request from "utils/request.js";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
    yield takeEvery("FETCH_USER", function* (action) {
        const user = yield call(request, { url: "/api/getUsers", method: "GET" });
        console.log(user);
        yield put({ type: "FETCH_NAMES", payload: user });
    });
    /*try {
        const user = yield call(request, { url: "/api/getUsers", method: "GET" });
        console.log(user);
        yield put({ type: "FETCH_NAMES", payload: user });
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }*/
}

export default fetchUser;
