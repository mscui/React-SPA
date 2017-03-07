import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'ActivePaySuccess.less';
import { Router, Route, Link, browserHistory } from 'react-router'
import Header from './components/Header/Header'



export default class ActivePaySuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                needPrice: 0,
                users: []
            }
        };
    }
    render() {
        return (
            <div className="active-paysuccess_wrapper">
                <Header title='订单详情' linkTo='/page/active'></Header>
                <div className="active-paysuccess">
                    <img src="/static/img/pay-success.png" alt="" className="active-paysuccess-img"/>
                    <p className="active-paysuccess-text">恭喜您已经成功报名，心露提醒您，请提前安排好您的活动安排。</p>
                    <Link to={'/page/active'}>
                        <button className="active-paysuccess_button">去首页看看</button>
                    </Link>
                </div>
            </div>
        );
    }
}
// ReactDOM.render(<ActivePaySuccess/>, document.getElementById('root'));
