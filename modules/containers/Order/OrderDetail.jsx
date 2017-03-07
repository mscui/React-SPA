import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import OrderList from './components/OrderList/OrderList'
import Header from './components/Header/Header'
import 'OrderDetail.less'

export default class OrderDetail extends Component {
  render() {
    return (
      <div className="order">
        <Header title='订单详情'></Header>
      </div>
    );
  }
}