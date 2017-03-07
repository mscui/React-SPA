import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'ActiveDetail.less';
import { Router, Route, Link, browserHistory } from 'react-router'
import Header from './components/Header/Header'
// import TodoItem from './TodoItem'


export default class ActiveDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: {}
        };
    }
    fetchFn = () => {
        fetch('/activity/getActivity?id=' + this.props.params.id)
            .then(response => {
                    console.log(response.status);
                    // console.log(response.json());
                    return response.json();
                }
            )
            .then((response) => {
                if (response.data.length !== 0) {

                    let data = Object.assign(this.state.data,response.data);
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
    render() {
        let priceBlock;
        if (this.state.discountPrice !== '') {
            priceBlock = (
                <span className="active-detail_price_discount">¥{this.state.data.discountPrice}/人</span>
            )
        }
        return (
            <div>
                <Header title='活动详情' linkTo='/page/active'></Header>
                <div className="active-detail">
                    <div className="active-detail_title">{this.state.data.title}</div>
                    <img src={this.state.data.imgUrl} alt="" className="active-detail_img"/>
                    <div className="active-detail_price">
                        {priceBlock}
                        <span className="active-detail_price_origin">¥{this.state.data.originPrice}/人</span>
                    </div>
                    <div className="active-detail_info">
                        <div className="active-detail_info_time">
                            <img src="/static/img/cal-active.png" alt="" className="active-detail_info_time_img"/>
                            <span className="active-detail_info_time_span">{this.state.data.timeS}</span>
                        </div>
                        <div className="active-detail_info_location">
                            <img src="/static/img/location-active.png" alt="" className="active-detail_info_location_img"/>
                            <span className="active-detail_info_location_span">{this.state.data.location}</span>
                        </div>
                        <div className="active-detail_info_person">
                            <img src="/static/img/person-active.png" alt="" className="active-detail_info_person_img"/>
                            <span className="active-detail_info_person_span">{this.state.data.personNum}人（活动规定人数）</span>
                        </div>
                    </div>
                    <div className="active-detail_main">
                        <p className="active-detail_main_title">活动简介：</p>
                        <p className="active-detail_main_content">{this.state.data.desc}</p>
                    </div>
                </div>
                {
                    (()=>{
                        let endTime = new Date(this.state.data.signEndTimeS);
                        let nowTime = new Date();
                        if (nowTime > endTime) {
                            // 时间已过
                            return (<button className="active-detail_button disable">报名时间已过</button>);

                        } else if (this.state.data.signedPersonNum > this.state.data.personNum) {
                            // 人数已满
                            return (<button className="active-detail_button disable">报名时间已过</button>);
                        } else {
                            return (
                                <Link to={'/page/active/' + this.props.params.id + '/signup'}>
                                    <button className="active-detail_button">报名</button>
                                </Link>
                            )
                        }
                    })()
                }
            </div>
        );
    }
}
// ReactDOM.render(<ActiveDetail/>, document.getElementById('root'));
