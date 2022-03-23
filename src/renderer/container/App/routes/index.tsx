import React, { useEffect } from "react";
import {  Route, Switch } from "react-router-dom";
import asyncComponent from "../../../utils/asyncComponent";
import { useHistory } from "react-router-dom";

const App: React.FC = () => {
    const history = useHistory();
    useEffect(() => {
        // document.title = "";
        // history.push(`/profile`);
    }, []);

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
