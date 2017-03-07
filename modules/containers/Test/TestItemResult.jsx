import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import Header from './components/Header/Header'
import { Router, Route, Link, browserHistory } from 'react-router'

import 'Test.less'
import 'TestItemResult.less'

export default class TestItemResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultData: {
                id: 4,
                psyTestId: 2,
                title: '',
                desc: '',
                personNum: 0
            }
        }
    }
    fetchFn = (id) => {
        let userAnswer = localStorage.getItem('result');

        let userAnswerJson = userAnswer;

        if (this.props.params.type === '2') {
             fetch('/psyTest/getPsyTestResultById?id=' + id)
                .then(response => {
                        console.log(response.status);
                        return response.json();
                })
                .then((response) => {
                    this.setState({
                        resultData: response.data
                    });
                })
                .catch((e) => {
                    console.log(e.result);
                })
        } else {
            fetch('/psyTest/getPsyTestResultByScore', {
                    method: 'POST',
                    body: userAnswerJson
                })
                .then(response => {
                    console.log(response.status);
                    return response.json();
                })
                .then((response) => {
                    this.setState({
                        resultData: response.data
                    });
                })
                .catch((e) => {
                    console.log(e.result);
                })
        }

    }
    componentDidMount() {
        this.fetchFn(this.props.params.id);
    }
  render() {
    // console.log(this.props.params.userId);
    return (
      <div className="test">
        <Header title='测试题目结果页' linkTo={'/page/tests'}></Header>
        <div className="testResult">
            <section className="testResult_header cf">
                <img src="/static/img/book.png" alt="" className="testResult_header_img"/>
                <div className="testResult_header_content">
                    <p className="testResult_header_content_title">{this.state.resultData.title}</p>
                    <div className="testResult_header_content_person">
                        <img src="/static/img/pen-pray.png" alt="" className="testResult_header_content_person_img"/>
                        <span className="testResult_header_content_person_num">{this.state.resultData.personNum}</span>
                    </div>
                </div>
            </section>
            <section className="testResult_content">
                <div className="testResult_content_result">
                    <div className="testResult_content_result_header">
                        <img src="/static/img/v.png" alt="" className="testResult_content_result_header_img"/>
                        <span className="testResult_content_result_header_title">测试结果</span>
                    </div>
                    <div className="testResult_content_result_main">
                        {this.state.resultData.title}
                    </div>
                </div>
                <div className="testResult_content_describe">
                    <div className="testResult_content_describe_header">
                        <img src="/static/img/small-book.png" alt="" className="testResult_content_describe_header_img"/>
                        <span className="testResult_content_describe_header_title">测试说明</span>
                    </div>
                    <div className="testResult_content_describe_main">
                        {this.state.resultData.desc}
                    </div>
                </div>
            </section>
            <section className="testResult_share">
                <span className="testResult_share_text">点右上角分享给朋友</span>
            </section>
        </div>
      </div>
    );
  }
}
// ReactDOM.render(<TestItemResult/>, document.getElementById('root'));