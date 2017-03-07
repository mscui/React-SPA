import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import ActiveList from './components/ActiveList/ActiveList'
import Header from './components/Header/Header'
import 'Active.less'

export default class ActiveIndex extends Component {
  render() {
    return (
      <div className="active">
        <Header title='活动列表'></Header>
        <ActiveList/>
      </div>
    );
  }
}
// ReactDOM.render(<ActiveIndex/>, document.getElementById('root'));
