import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Redirect, Route, IndexRoute, Link, browserHistory } from 'react-router'

import ActiveIndex from 'ActiveIndex'
import ActiveDetail from 'ActiveDetail'
import ActiveSignUp from 'ActiveSignUp'
import ActiveSignUpPay from 'ActiveSignUpPay'
import ActiveSignUpUpdate from 'ActiveSignUpUpdate'
import ActivePaySuccess from 'ActivePaySuccess'

// const requireAuth = (nextState, replace) => {
//     if (!auth.isAdmin()) {
//         // Redirect to Home page if not an Admin
//         replace({ pathname: '/' })
//     }
// }
// export const AdminRoutes = () => {
//   return (
//      <Route path="/admin" component={Admin} onEnter={requireAuth} />
//   )
// }
render((
    <Router history={browserHistory}>
        {/* 从 /inbox/messages/:id 跳转到 /messages/:id */}
        <Redirect from="messages/:id" to="/messages/:id" />
        <Route path="/page/active" component={ActiveIndex}/>
        <Route path="/page/active/:id" component={ActiveDetail}/>
        <Route path="/page/active/:id/signup" component={ActiveSignUp}/>
        <Route path="/page/active/:orderId/signupupdate" component={ActiveSignUpUpdate}/>
        <Route path="/page/active/signupuppay/:orderId/:passKey" component={ActiveSignUpPay}/>
        <Route path="/page/active/paysuccess/:id" component={ActivePaySuccess}/>
    </Router>
), document.getElementById('root'));