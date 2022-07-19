import React from "react";
import {  Route, Switch } from "react-router-dom";
import asyncComponent from "../../../utils/asyncComponent";

const App: React.FC = () => {
    return (
        <div className="gx-main-content-wrapper">
            <Switch>
                <Route exact path='/proxies' component={asyncComponent(() => import("../../../screens/ProxiesScreen"))} />
                <Route exact path='/profile' component={asyncComponent(() => import("../../../screens/ProfileScreen"))} />
                <Route exact path='/task' component={asyncComponent(() => import("../../../screens/TaskScreen"))} />
                <Route exact path='/orders' component={asyncComponent(() => import("../../../screens/ProfileScreen"))} />
                <Route exact path='/raffles' component={asyncComponent(() => import("../../../screens/ProxiesScreen"))} />
            </Switch>
        </div>
    );
}

export default App
