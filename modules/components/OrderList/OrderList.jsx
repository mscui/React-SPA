import React, { Component } from 'react';
import 'OrderList.less';
import { Router, Route, Link, browserHistory } from 'react-router'


class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state={
            listData: [],
            pageSize: 5,
            page: 1,
            isScroll: false
        };
    }
    fetchFn = (page, pageSize) => {
        fetch('/userOrder/getUserOrderList?page=' + page + '&pageSize=' + pageSize)
            .then(response => {
                    console.log(response.status);
                    return response.json();
                }
            )
            .then((response) => {
                if (response.data.length !== 0) {
                    let listData = this.state.listData;
                    let data = listData.concat(response.data);
                    // this.setState({
                    //     listData: data
                    // });
                     console.log(data);
                }

            })
            .catch((e) => {
                console.log(e.result);
            })
    }
    componentDidMount() {
        this.fetchFn(this.state.page, this.state.pageSize);

        window.onscroll = () => {
            if (document.body.clientHeight + document.body.scrollTop === document.body.scrollHeight) {
                if (this.refs.orderlist) {
                    this.fetchFn(++this.state.page, this.state.pageSize);
                    this.setState({
                        isScroll: true
                    });
                }
            }
        }

    }
    render () {
        let listItem = this.state.listData.map((item, index)=>{
            return (
                <li className="orderlist_item cf" key={index}>
                    <Link to={`/page/order/${item.activityId}`}>
                        <img src={item.imgUrl} alt="" className="orderlist_item-pic"/>
                        <div className="orderlist_item-content">
                            <p className="orderlist_item-title">{item.title}</p>
                            <div className="orderlist_item-info_wrapper">
                                <section className="orderlist_item-info cf">
                                    <p className="orderlist_item-info_time">
                                        <img src="/static/img/cal.png" alt="" className="orderlist_item_icon"/>
                                        <span className="orderlist_item-info_span">{item.timeS}</span>
                                    </p>
                                    <p className="orderlist_item-info_location">
                                        <img src="/static/img/location.png" alt="" className="orderlist_item_icon"/>
                                        <span className="orderlist_item-info_span orderlist_item-info_location_content text-overflow">{item.location}</span>
                                    </p>
                                </section>
                                <section className="orderlist_item-info cf">
                                    <p className="orderlist_item-info_person">
                                        <img src="/static/img/person.png" alt="" className="orderlist_item_icon"/>
                                        <span className="orderlist_item-info_span">{item.personNum}</span>
                                    </p>
                                    <p className="orderlist_item-info_price">
                                        <span className="orderlist_item-info_span orderlist_item-info_price__origin">¥{item.needPrice}/人</span>
                                    </p>
                                </section>
                            </div>
                        </div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className={this.state.isScroll ? "orderlist_scroll" : "orderlist"} ref="orderlist">
                {listItem}
            </ul>
        )
    }
}

export default OrderList
