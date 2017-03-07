import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import OrderList from './components/OrderList/OrderList'
import Header from './components/Header/Header'
import 'Order.less'

export default class OrderIndex extends Component {
  render() {
    return (
      <div className="order">
        <Header title='订单列表'></Header>
        <OrderList/>
      </div>
    );
  }
}