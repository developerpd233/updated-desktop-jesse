import React, { Fragment, lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Switch, HashRouter, Redirect } from "react-router-dom"
import ProtectedRoute from "../utils/protectedRoute"
import { ReadCookie } from "../utils/readCookies"
import { CircularProgress } from '@mui/material'
import AppStructure from '../utils/structure'

const LoginScreen = lazy(() => import("../screens/LoginScreen"))
const ForgotPasswordScreen = lazy(() => import("../screens/ForgotPasswordScreen"))
const TaskScreen = lazy(() => import('../screens/TaskScreen'))
const NewTaskScreen = lazy(() => import('../screens/TaskScreen/NewTaskScreen'))
const ProfileScreen = lazy(() => import('../screens/ProfileScreen'))
const NewProfileScreen = lazy(() => import('../screens/ProfileScreen/NewProfileScreen'))
const ProxiesScreen = lazy(() => import('../screens/ProxiesScreen'))
const NewProxyScreen = lazy(() => import('../screens/ProxiesScreen/NewProxyScreen'))
const OrderScreen = lazy(() => import('../screens/OrderScreen'))
const SettingScreen = lazy(() => import('../screens/SettingScreen'))
const  StartScreen  = lazy(() => import('../screens/startUpScreen/index'))
const MainApp = lazy(() => import("../container/App/MainApp"))
const Raffal = lazy(() => import('../screens/raffel/index'))
interface MyState {
    token: any; // like this
};

interface myProps {
};

class Routes extends React.Component<myProps, MyState> {
    state: MyState = {
        token: null,
    }

    UNSAFE_componentWillMount() {
        let token = ReadCookie("token")
        // let token = ''
        this.setState({
            token: token,
        })
    }
    render() {
        return (
            <Fragment>
                <Router >
                    <Suspense fallback={<CircularProgress />}>
                        <Switch>
                            <HashRouter>
								              <Route exact path='/forgot' component={ForgotPasswordScreen} />
                              <Route exact path='/' component={LoginScreen} />

                              {/* <Route exact path="/" component={LoginScreen} /> */}
                              {/* <Route exact path="/"
                                render={() => {
                                  if (this.state.token) {
                                      return <Route exact path='/task' component={()=> (<AppStructure><TaskScreen /></AppStructure>)} />
                                  } else {
                                      return <Route exact path="/" component={LoginScreen} />
                                  }
                                }}
                              /> */}
                              <Route exact path='/startUpScreen' component={()=> (<AppStructure><StartScreen /></AppStructure>)} />
                              <Route exact path='/task' component={()=> (<AppStructure><TaskScreen /></AppStructure>)} />
                              <Route exact path='/new-task' component={()=> (<AppStructure><NewTaskScreen /></AppStructure>)} />
                              <Route exact path='/proxies' component={()=> (<AppStructure><ProxiesScreen /></AppStructure>)} />
                              <Route exact path='/new-proxies' component={()=> (<AppStructure><NewProxyScreen /></AppStructure>)} />
                              <Route exact path='/profile' component={()=> (<AppStructure><ProfileScreen /></AppStructure>)} />
                              <Route exact path='/new-profile' component={()=> (<AppStructure><NewProfileScreen /></AppStructure>)} />
                              <Route exact path='/orders' component={()=> (<AppStructure><OrderScreen /></AppStructure>)} />
                              <Route exact path ="/raffel"component={()=> (<AppStructure>< Raffal/></AppStructure>)} />
                              {/* <Route exact path='/raffles' component={()=> (<AppStructure><ProfileScreen /></AppStructure>)} /> */}
                              <Route exact path='/new-task/:id' component={()=> (<AppStructure><NewTaskScreen /></AppStructure>)} />
                              <Route exact path='/new-profile/:id' component={()=> (<AppStructure><NewProfileScreen /></AppStructure>)} />
                              <Route exact path='/new-proxies/:id' component={()=> (<AppStructure><NewProxyScreen /></AppStructure>)} />
                              <Route exact path='/settings' component={()=> (<AppStructure><SettingScreen /></AppStructure>)} />
                            </HashRouter>
                        </Switch>
                    </Suspense>
                </Router>
            </Fragment>
        )
    }
}
export default Routes
