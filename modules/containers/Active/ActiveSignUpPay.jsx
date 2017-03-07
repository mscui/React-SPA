import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'ActiveSignUpPay.less';
import { Router, Route, Link, browserHistory } from 'react-router'
import Header from './components/Header/Header'



export default class ActiveSignUpPay extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                needPrice: 0,
                users: []
            }
        };
        this.handlePay = this.handlePay.bind(this);
    }
    fetchFn = () => {
        fetch('/userOrder/getUserOrder?orderId=' + this.props.params.orderId + '&passKey=' + this.props.params.passKey)
            .then(response => {
                    console.log(response.status);
                    // console.log(response.json());
                    return response.json();
                }
            )
            .then((response) => {
                if (response.data.length !== 0) {

                    let data = Object.assign(this.state.data, response.data);
                    this.setState({
                        data: data
                    });
                }
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e.result);
            })
    }
    componentDidMount() {
        this.fetchFn();
    }
    handlePay() {
        // paysuccess
        // this.context.router.push(`/page/active/paysuccess/` + this.state.data.orderId);
    }
    render() {
        return (
            <div className="active-signuppay_wrapper">
                <Header title='订单详情' linkTo='/page/active'></Header>
                <div className="active-signuppay">
                    <div className="active-signuppay_info">
                        <div className="active-signuppay_info_name">
                            <span className="active-signuppay_info_name_title">活动名称</span>
                            <span className="active-signuppay_info_name_content">{this.state.data.title}</span>
                        </div>
                        <div className="active-signuppay_info_price">
                            <span className="active-signuppay_info_price_title">活动金额</span>
                            <span className="active-signuppay_info_price_content">¥{this.state.data.needPrice}</span>
                        </div>
                    </div>
                    <div className="active-signuppay_person">
                        <div className="active-signuppay_person_header">
                            <span className="active-signuppay_person_header_title">预约信息</span>
                        </div>
                        <div className="active-signuppay_person_info">
                            {this.state.data.users.map((item, index)=>
                                    <div className="active-signuppay_person_info_wrapper" key={index}>
                                        <span className="active-signuppay_person_info_name">{item.name}</span>
                                        <span className="active-signuppay_person_info_tel">{item.tel}</span>
                                    </div>
                            )}
                        </div>

                    </div>
                </div>
                <button className="active-signuppay_button" onClick={this.handlePay}>立即支付</button>
            </div>
        );
    }
}

