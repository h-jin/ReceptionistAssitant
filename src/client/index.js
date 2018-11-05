import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/store.js";
import List from "connectors/List.js";
import PriorityList from "connectors/PriorityList.js";

const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={List} />
                <Route exact path="/priority" component={PriorityList} />
            </Switch>
        </Router>
    </Provider>,
    MOUNT_NODE);

window.store = store;
