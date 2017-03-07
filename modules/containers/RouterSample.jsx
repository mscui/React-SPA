import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

const App = React.createClass({/*...*/})
const About = React.createClass({/*...*/})
const NoMatch = React.createClass({/*...*/})

const Users = React.createClass({
  render() {
    return (
      <div>
        <h1>Users</h1>
        <div className="master">
          <ul>
            {/* use Link to route around the app */}
            {this.state.users.map(user => (
              <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    )
  }
})

const User = React.createClass({
  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      user: findUserById(this.props.params.userId)
    })
  },

  render() {
    return (
      <div>
        <h2>{this.state.user.name}</h2>
        {/* etc. */}
      </div>
    )
  }
})

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'))