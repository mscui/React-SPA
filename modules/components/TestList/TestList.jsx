import React, { Component } from 'react';
import 'TestList.less';
import { Router, Route, Link, browserHistory } from 'react-router'


class TestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            pageSize: 5,
            page: 1,
            isScroll: false
        };
    }
    fetchFn = (page, pageSize) => {
        fetch('/psyTest/getPsyTestList?page=' + page + '&pageSize=' + pageSize)
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
                if (this.refs.testlist) {
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
                <li className="testlist_item cf" key={index}>
                    <Link to={`/page/tests/${item.id}`}>
                        <img src={item.imgUrl} alt="" className="testlist_item-pic"/>
                        <div className="testlist_item-content">
                            <p className="testlist_item-title">{item.title}</p>
                            <div className="testlist_item-info_wrapper">
                                <section className="testlist_item-info cf">
                                    <p className="testlist_item-info_person">
                                        <span className="testlist_item-info_span">测试人数：{item.personNum}</span>
                                    </p>
                                </section>
                            </div>
                        </div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className={this.state.isScroll ? "testlist_scroll" : "testlist"} ref="testlist">
                {listItem}
            </ul>
        )
    }
}

export default TestList
