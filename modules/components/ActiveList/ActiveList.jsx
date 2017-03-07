import React, { Component } from 'react';
import 'ActiveList.less';
import { Router, Route, Link, browserHistory } from 'react-router'


class ActiveList extends Component {
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
        fetch('/activity/getActivityList?page=' + page + '&pageSize=' + pageSize)
            .then(response => {
                    console.log(response.status);
                    return response.json();
                }
            )
            .then((response) => {
                if (response.data.length !== 0) {
                    let listData = this.state.listData;
                    let data = listData.concat(response.data);
                    this.setState({
                        listData: data
                    });
                }
                // console.log(listData);
            })
            .catch((e) => {
                console.log(e.result);
            })
    }
    componentDidMount() {
        this.fetchFn(this.state.page, this.state.pageSize);

        window.onscroll = () => {
            if (document.body.clientHeight + document.body.scrollTop === document.body.scrollHeight) {
                if (this.refs.activelist) {
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
            let priceBlock;
            if (item.discountPrice !== '') {
                priceBlock = (
                    <span className="activelist_item-info_span activelist_item-info_price__discount">¥{item.discountPrice}/人</span>
                )
            }
            return (
                <li className="activelist_item cf" key={index}>
                    <Link to={`/page/active/${item.id}`}>
                        <img src={item.imgUrl} alt="" className="activelist_item-pic"/>
                        <div className="activelist_item-content">
                            <p className="activelist_item-title">{item.title}</p>
                            <div className="activelist_item-info_wrapper">
                                <section className="activelist_item-info cf">
                                    <p className="activelist_item-info_time">
                                        <img src="/static/img/cal.png" alt="" className="activelist_item_icon"/>
                                        <span className="activelist_item-info_span">{item.timeS}</span>
                                    </p>
                                    <p className="activelist_item-info_location">
                                        <img src="/static/img/location.png" alt="" className="activelist_item_icon"/>
                                        <span className="activelist_item-info_span activelist_item-info_location_content text-overflow">{item.location}</span>
                                    </p>
                                </section>
                                <section className="activelist_item-info cf">
                                    <p className="activelist_item-info_person">
                                        <img src="/static/img/person.png" alt="" className="activelist_item_icon"/>
                                        <span className="activelist_item-info_span">{item.personNum}</span>
                                    </p>
                                    <p className="activelist_item-info_price">
                                        {priceBlock}
                                        <span className="activelist_item-info_span activelist_item-info_price__origin">¥{item.originPrice}/人</span>
                                    </p>
                                </section>
                            </div>
                        </div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className={this.state.isScroll ? "activelist_scroll" : "activelist"} ref="activelist">
                {listItem}
            </ul>
        )
    }
}

export default ActiveList
