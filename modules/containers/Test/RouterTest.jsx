import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Redirect, Route, IndexRoute, Link, browserHistory } from 'react-router'
import TestItems from 'TestItems'
import TestItemIndex from 'TestItemIndex'
import TestItemDetail from 'TestItemDetail'
import TestItemResult from 'TestItemResult'

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
        <Route path="/page/tests" component={TestItems}/>
        <Route path="/page/tests/:id" component={TestItemIndex}/>
        <Route path="/page/tests/:id/question/:type" component={TestItemDetail}/>
        <Route path="/page/tests/:id/result/:type" component={TestItemResult}/>
    </Router>
), document.getElementById('root'));