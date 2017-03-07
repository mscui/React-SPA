import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import TestList from './components/TestList/TestList'
import Header from './components/Header/Header'
import 'Test.less'

export default class TestItems extends Component {
  render() {
    // http://127.0.0.1:8080/page/tests?bar=1 获取bar的值
    console.log(this.props.location.query.bar);
    return (
      <div className="test">
        <Header title='测试列表'></Header>
        <TestList/>
      </div>
    );
  }
}
// ReactDOM.render(<TestItems/>, document.getElementById('root'));

