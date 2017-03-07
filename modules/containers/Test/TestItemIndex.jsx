import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import Header from './components/Header/Header'
import { Router, Route, Link, browserHistory } from 'react-router'
import 'TestItemIndex.less'
import 'Test.less'

export default class TestItemIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemIndexData: {},
            id: this.props.params.id
        }
    }
    fetchFn = (id) => {
        fetch('/psyTest/getPsyTest?id=' + id + '&isDetail=false')
            .then(response => {
                    console.log(response.status);
                    return response.json();
            })
            .then((response) => {
                this.setState({
                    itemIndexData: response.data
                });
            })
            .catch((e) => {
                console.log(e.result);
            })
    }
     componentDidMount() {
        this.fetchFn(this.state.id);
    }
    render() {
        let testItemIndexMain = (
            <div>
                <div className="testItemIndex_header">
                    <h1 className="testItemIndex_header_title">{this.state.itemIndexData.title}</h1>
                    <p className="testItemIndex_header_title_person">
                        <img src="/static/img/pen.png" alt="" className="testItemIndex_header_title_person_img"/>
                        <span className="testItemIndex_header_title_person_text">{this.state.itemIndexData.personNum}</span>
                    </p>
                </div>
                <img src={this.state.itemIndexData.imgUrl} alt="" className="testItemIndex_img"/>
                <p className="testItemIndex_content">{this.state.itemIndexData.desc}</p>
            </div>
        )
        return (
          <div className="test">
            <Header title='测试题目首页' linkTo='/page/tests'></Header>
            <section className="testItemIndex">
                {testItemIndexMain}
            </section>

            <Link to={'/page/tests/' + this.props.params.id + '/question/' + this.state.itemIndexData.type}>
                <button className="testItemIndex_button">开始测试</button>
            </Link>

          </div>
        );
  }
}
// ReactDOM.render(<TestItemIndex/>, document.getElementById('root'));