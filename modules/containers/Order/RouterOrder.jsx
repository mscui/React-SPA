import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Redirect, Route, IndexRoute, Link, browserHistory } from 'react-router'

import OrderIndex from 'OrderIndex'
import OrderDetail from 'OrderDetail'

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
        <Route path="/page/order" component={OrderIndex}/>
        <Route path="/page/order/:id" component={OrderDetail}/>
    </Router>
), document.getElementById('root'));