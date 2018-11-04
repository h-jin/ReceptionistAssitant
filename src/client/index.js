import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/store.js";
import Emergency from "connectors/Emergency.js";

const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Emergency} />
                <Route exact path="/appointment" component={Emergency} />
                <Route exact path="/walk-in" component={Emergency} />
            </Switch>
        </Router>
    </Provider>,
    MOUNT_NODE);

window.store = store;
