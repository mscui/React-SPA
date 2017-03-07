import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'ActiveSignUpUpdate.less';
import { Router, Route, Link, browserHistory } from 'react-router'
import Header from './components/Header/Header'
// import TodoItem from './TodoItem'


export default class ActiveSignUpUpdate extends Component {
    render() {
        return (
            <div>
                <Header title='修改人员' linkTo='/page/active'></Header>
                <div className="active-signupupdate">
                    <div className="active-signupupdate_info">
                        <div className="active-signupupdate_info_name">
                            <span className="active-signupupdate_info_name_title">活动名称</span>
                            <span className="active-signupupdate_info_name_content">家庭和睦是给孩子最好的礼物</span>
                        </div>
                        <div className="active-signupupdate_info_price">
                            <span className="active-signupupdate_info_price_title">活动金额</span>
                            <span className="active-signupupdate_info_price_content">¥200</span>
                        </div>
                    </div>
                    <div className="active-signupupdate_person">
                        <div className="active-signupupdate_person_header">
                            <span className="active-signupupdate_person_header_title">预约信息</span>
                        </div>
                        <div className="active-signupupdate_person_info">
                            <div className="active-signupupdate_person_info_name">
                                <label htmlFor="name" className="active-signupupdate_person_info_name_label">姓名：</label>
                                <input type="text" id="name" placeholder="请输入姓名" className="active-signupupdate_person_info_name_input"/>
                            </div>
                            <div className="active-signupupdate_person_info_tel">
                                <label htmlFor="tel" className="active-signupupdate_person_info_tel_label">手机号：</label>
                                <input type="text" id="tel" placeholder="请输入手机号" className="active-signupupdate_person_info_tel_input"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Link to={'/page/tests/' + this.props.params.userId + '/question'}>*/}
                    <button className="active-signupupdate_button">确认修改</button>
                {/*</Link>*/}
            </div>
        );
    }
}
// ReactDOM.render(<ActiveSignUpUpdate/>, document.getElementById('root'));
