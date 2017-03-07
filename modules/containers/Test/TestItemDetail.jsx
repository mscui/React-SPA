import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import Header from './components/Header/Header'
import { Router, Route, Link, browserHistory } from 'react-router'

import 'Test.less'
import 'TestItemDetail.less'

let userAnswer = [];
//用户自己分配分数
class ScoreSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: -1
        }
        this.handleClickScore = this.handleClickScore.bind(this);
        this.isActive = this.isActive.bind(this);
    }
    isActive(value) {
        this.state
        return 'testDetail_score_content_score_option' + ((value === this.state.selected) ? ' active' : '');
    }
    handleClickScore(filter) {
        this.setState({
            selected: filter
        });
        let obj = {
            score: filter,
            refId: this.props.refId,
            id: this.props.id
        }
        if (userAnswer.length !== 0) {
             userAnswer = userAnswer.filter((i) => {
                return i.id !== obj.id;
            });
        }
        userAnswer.push(obj);

        this.props.changeAnswer(userAnswer);
    }
    render() {
        let score = [];
        for(let i = 0, len = this.props.score; i < len; i++) {
            score.push(
                <span key={this.props.id + '-' + i}
                    className={this.isActive(i)}
                    onClick={() => this.handleClickScore(i)}>
                    {i}
                </span>
            );
        }
        return (
            <section className="testDetail_score_content">
                <span className="testDetail_score_content_option">{this.props.title}</span>
                <div className="testDetail_score_content_score">
                    {score}
                </div>
            </section>
        )
    }
}

// 题目定义分数
class NormalSection extends Component {
    constructor(props) {
        super(props);
        this.handleChangeChk = this.handleChangeChk.bind(this);
    }
    handleChangeChk(e) {
        // 积分题返回数据：[{“resultId”:1,”score”:1},{“resultId”:2,”score”:2}]

        let obj = {
            resultId: e.target.getAttribute('data-resultId'),
            score: e.target.getAttribute('data-score'),
            refId: e.target.name
        };
        if (userAnswer.length !== 0) {
            userAnswer = userAnswer.filter((item)=>{
                return item.refId !== e.target.name;
            });
        }

        userAnswer.push(obj);
        this.props.changeAnswer(userAnswer);
    }
    render () {
        return (
            <div>
                {this.props.value.map((item, index)=>(
                    <section className="testDetail_question_content" key={item.id + '-' + index}>
                        <span className="testDetail_question_content_option">{item.title}</span>
                        <label htmlFor={item.id} className="testDetail_question_button">
                            <input type="radio"
                                id={item.id}
                                data-resultId={item.resultId}
                                name={this.props.id}
                                value={item.score}
                                data-score={item.score}
                                onChange={this.handleChangeChk}
                                key={item.title + index}/>
                            <i></i>
                        </label>
                    </section>
                ))}
            </div>

        )
    }
}
// 跳转题
class JumpSection extends Component {
    constructor(props) {
        super(props);
        this.handleChangeChk = this.handleChangeChk.bind(this);
    }
    handleChangeChk(e) {

        let userChooseObj = {
            code: e.target.value,
            refId: e.target.name
        };
        if (userAnswer.length !== 0) {
            userAnswer = userAnswer.filter((item)=>{
                return item.refId !== e.target.name;
            });
        }
        if (userChooseObj['code'] === '#') {
            userChooseObj['resultId'] = e.target.getAttribute('data-resultId');
        }
        userAnswer.push(userChooseObj);

        this.props.changeAnswer(userChooseObj);
    }
    render () {
        return (
            <div>
                {this.props.value.map((item, index)=>(
                    <section className="testDetail_jump_content" key={item.id + '-' + index}>
                        <span className="testDetail_jump_content_option">{item.title}</span>
                        <label htmlFor={item.id} className="testDetail_jump_button">
                            <input type="radio"
                                id={item.id}
                                name={this.props.id}
                                value={item.nextSubjectCode}
                                defaultChecked={false}
                                data-resultId={item.resultId}
                                onChange={this.handleChangeChk}/>
                            <i></i>
                        </label>
                    </section>
                ))}
            </div>

        )
    }
}
export default class TestItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 第一次取得数据时候存储data的容器
            questionValue: {
                title: '',
                personNum: 0,
                subjects: [{
                    // 测试题id
                    refId: 2,
                    title: '',
                    options: []
                }]
            },
            // 1固定积分，2跳转，3自定义积分
            type: this.props.params.type,
            // 跳转题refId
            jumpSubjectId: 0,
            // 整个大题的id,getPsyTest接口中id参数
            id: this.props.params.id,
            // 跳转题目小题id,code参数
            jumpNextId: 0,
            // 题目进行进度
            step: 0,
            // 普通题目每道小题的题目及选项内容
            normalValue: {},
            jumpResultId: 0,
            normalResult: [],
            canMoveToNext: false
        }
        this.changeAnswer = this.changeAnswer.bind(this);
        this.handleClickNextQuestion = this.handleClickNextQuestion.bind(this);
        this.handleClickLastQuestion = this.handleClickLastQuestion.bind(this);
        this.handleClickStoreData = this.handleClickStoreData.bind(this);
    }
    fetchFn = () => {
        if (this.state.type === '2' && this.state.step !== 0) {
            // 跳转题后面的题
            // refId:String类型，Subject中的refId，即心里测试题主表PsyTest的id
            // code:String类型，SubjectOption中的nextSubjectCode
            fetch('/psyTest/getNextJumpSubject?refId=' + this.state.questionValue.subjects[0].refId + '&code=' + this.state.jumpNextId)
            .then(response => {
                    console.log(response.status);
                    return response.json();
                }
            )
            .then((response) => {
                this.setState({
                    questionValue: response.data
                });
                // console.log('fetch Promise');
            })
            .catch((e) => {
                console.log(e.result);
            })
        } else {
            // 积分题
            fetch('/psyTest/getPsyTest?id=' + this.state.id + '&isDetail=true')
            .then(response => {
                    console.log(response.status);
                    return response.json();
                }
            )
            .then((response) => {
                this.setState({
                    questionValue: response.data,
                    normalValue: response.data.subjects[this.state.step]
                });
                // console.log('fetch Promise');
            })
            .catch((e) => {
                console.log(e.result);
            })
        }

    }
    componentWillMount(){
        this.fetchFn();
    }
    changeAnswer(answer) {
        // 跳转题
        if (this.state.type === '2') {
            this.setState({
                jumpSubjectId: answer.refId,
                jumpNextId: answer.code,
            });
            if (answer.code === '#') {
                this.setState({
                    jumpResultId: answer.resultId
                });
            }
        } else {
            this.setState({
                normalResult: answer
            });
        }
        this.setState({
            canMoveToNext: true
        });
    }
    handleClickLastQuestion() {
        // 上一题(只针对于普通题目)
        this.setState({
            step: --this.state.step
        });
        this.setState({
            normalValue: this.state.questionValue.subjects[this.state.step]
        });
    }
    handleClickNextQuestion() {
        // 下一题
        if (this.state.canMoveToNext) {
            this.setState({
                step: ++this.state.step
            });
            // todo:判断用户是否选择选项
            if (this.state.type === '2') {
                // 跳转题
                this.fetchFn();
            } else if (this.state.type === '1') {
                // 普通题目
                this.setState({
                    normalValue: this.state.questionValue.subjects[this.state.step]
                });
            } else {
                // 用户自定义普通题目

                let refId = this.state.normalValue.refId;
                let score = 0;
                this.state.normalResult.map((item, index)=>{
                    if (item.refId === refId) {
                        score += item.score;
                    }
                });
                if (score !== this.state.normalValue.options[0].score) {
                    console.log('所选分值总数必须等于总分值');
                } else {
                    this.setState({
                        normalValue: this.state.questionValue.subjects[this.state.step]
                    });
                }
            }
        } else {
            console.log('没有选择');
        }
    }
    handleClickStoreData() {
        if (this.state.type !== '2') {
            console.log(this.state.normalResult);
            localStorage.setItem('result', JSON.stringify(this.state.normalResult));
        }
    }
    render() {
        // console.log(this.props.params.userId);


        let progressStyle = {
            width: ((this.state.step + 1)/this.state.questionValue.subjects.length) * 100 + '%'
        };
        return (
            <div className="test">
                <Header title='测试题目详情页' linkTo={'/page/tests/' + this.props.params.id}></Header>
                <div className="testDetail">
                    <section className="testDetail_header cf">
                        <img src="/static/img/book.png" alt="" className="testDetail_header_img"/>
                        <div className="testDetail_header_content">
                            <p className="testDetail_header_content_title">{this.state.questionValue.title}</p>
                            <div className="testDetail_header_content_person">
                                <img src="/static/img/pen-pray.png" alt="" className="testDetail_header_content_person_img"/>
                                <span className="testDetail_header_content_person_num">{this.state.questionValue.personNum}</span>
                            </div>
                        </div>
                    </section>
                    {
                        (()=>{
                            if (this.state.type !== '2') {
                                return (
                                    <section className="testDetail_progress">
                                        <span className="testDetail_progress_num">{this.state.step + 1}/{this.state.questionValue.subjects.length}</span>
                                        <div className="testDetail_progress_bar">
                                            <div className="testDetail_progress_bar_num" style={progressStyle}></div>
                                        </div>
                                    </section>
                                )
                            }
                        })()
                    }
                    {
                        (() => {
                            if (this.state.type === '1') {
                                return (
                                    <section className="testDetail_question">
                                        <p className="testDetail_question_title">{this.state.questionValue.subjects[this.state.step].title}</p>
                                        <NormalSection
                                            id={this.state.questionValue.subjects[this.state.step].refId}
                                            value={this.state.questionValue.subjects[this.state.step].options}
                                            changeAnswer={this.changeAnswer}/>
                                    </section>
                                )
                            } else if (this.state.type === '2') {
                                return (
                                    <section className="testDetail_jump">
                                        <p className="testDetail_jump_title">{this.state.questionValue.subjects[0].title}</p>
                                        <JumpSection
                                            id={this.state.questionValue.subjects[0].refId}
                                            value={this.state.questionValue.subjects[0].options}
                                            changeAnswer={this.changeAnswer}/>
                                    </section>
                                )
                            } else {
                                return (
                                    <section className="testDetail_score">
                                        <p className="testDetail_score_title">{this.state.questionValue.subjects[this.state.step].title}</p>
                                        {
                                            this.state.questionValue.subjects[this.state.step].options.map((item, index) => (
                                                <ScoreSection
                                                    key={item.id + '-' +index}
                                                    score={item.score}
                                                    id={item.id}
                                                    refId={item.refId}
                                                    title={item.title}
                                                    changeAnswer={this.changeAnswer}/>
                                            ))
                                        }
                                    </section>
                                )
                            }
                        })()
                    }
                    <section className="testDetail_button">
                        <button className={(this.state.type === '2' || this.state.step === 0) ? "disable_button" : "testDetail_button_goback"}onClick={this.handleClickLastQuestion}>上一题</button>
                        {
                            (()=>{
                                if ((this.state.type === '2' && this.state.jumpNextId === '#') || (this.state.type !== '2' && this.state.step === this.state.questionValue.subjects.length - 1)) {
                                    return (
                                        <Link to={'/page/tests/' + this.state.jumpResultId + '/result/' + this.state.type}>
                                            <button className="testDetail_button_result"
                                            onClick={this.handleClickStoreData}>查看答案</button>
                                        </Link>
                                    )
                                } else  {
                                    return (
                                        <button className={this.state.canMoveToNext ? "testDetail_button_next" : "testDetail_button_next cantMove_button" } onClick={this.handleClickNextQuestion}>下一题</button>
                                    )
                                }
                            })()
                        }
                    </section>
                </div>

            </div>
        );
    }
}
// ReactDOM.render(<TestItemDetail/>, document.getElementById('root'));