import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'ActiveSignUp.less';
import { Router, Route, Link, browserHistory } from 'react-router'
import Header from './components/Header/Header'
// import TodoItem from './TodoItem'

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.handleRemovePerson = this.handleRemovePerson.bind(this);
        this.updateInputName = this.updateInputName.bind(this);
        this.updateInputTel = this.updateInputTel.bind(this);
    }
    handleRemovePerson(index, e) {
        e.preventDefault();
        e.stopPropagation();
        const length = this.props.inputForms.length;
        let inputForms = [];

        if (index !== 0 && length !== 1) {
            let array1 = this.props.inputForms.slice(0, index);
            let array2 = this.props.inputForms.slice(index + 1, length);
            inputForms = array1.concat(array2);
        } else if (index === 0 && length !== 1) {
            inputForms = this.props.inputForms.slice(1, length);
        }
        this.props.handleUpdateInput(inputForms);
        this.props.updateCanAddPerson();
    }
    updateInputName(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.props.updateInputName(this.props.id, evt.target.value);
    }
    updateInputTel(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.props.updateInputTel(this.props.id, evt.target.value);
    }
    render() {
        return (
            <div className="active-signup_person_info">
                <i className="active-signup_person_info_cancle" onClick={(index, evt)=>this.handleRemovePerson(this.props.id, evt)}></i>
                <div className="active-signup_person_info_name">
                    <label htmlFor="name" className="active-signup_person_info_name_label">姓名：</label>
                    <input type="text" id="name" placeholder="请输入姓名" className="active-signup_person_info_name_input" onChange={this.updateInputName}/>
                </div>
                <div className="active-signup_person_info_tel">
                    <label htmlFor="tel" className="active-signup_person_info_tel_label">手机号：</label>
                    <input type="text" id="tel" placeholder="请输入手机号" className="active-signup_person_info_tel_input" onChange={this.updateInputTel}/>
                </div>
            </div>
        )
    }
}

export default class ActiveSignUp extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state={
            data: {},
            signUpPersonInfo: {'0':{
                name: '',
                tel: ''
            }},
            canAddPerson: false,
            price: 0,
            // needPrice: 0,
            inputForms: []
        };
        this.handleAddPerson = this.handleAddPerson.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.updateInputName = this.updateInputName.bind(this);
        this.updateInputTel = this.updateInputTel.bind(this);
        this.updateCanAddPerson = this.updateCanAddPerson.bind(this);
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
                        data: data,
                        price: data.discountPrice !== '' ? data.discountPrice : data.originPrice
                    });
                }
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e.result);
            })
    }
    postDataFn = (params) => {
        fetch('/userOrder/doUserOrder', {
            method: 'POST',
            body: JSON.stringify(params)
        })
        .then(response => {
                console.log(response.status);
                // console.log(response.json());
                return response.json();
        })
        .then((response) => {
            this.context.router.push(`/page/active/signupuppay/` + response.data.orderId + `/` + response.data.passKey
                 );
        })
        .catch((e) => {
            console.log(e.result);
        })
    }
    componentDidMount() {
        this.fetchFn();
        const inputForms = this.state.inputForms.concat(InputForm);
        this.setState({inputForms});
    }
    handleAddPerson(id, e) {
        e.preventDefault();
        e.stopPropagation();
        let length = this.state.inputForms.length;

        if (this.state.canAddPerson && length < 5) {
            const inputForms = this.state.inputForms.concat(InputForm);
            const items = this.state.signUpPersonInfo;
            items[id] = {};
            this.setState({inputForms});
            this.setState({items});

            // let price = this.state.price * (length + 1);
            this.setState({
                // needPrice: price,
                canAddPerson: false
            });
        } else if (!this.state.canAddPerson) {
            console.log('先填写姓名和手机号');
        } else if (length >= 5) {
            console.log('只允许添加5个人');
        }


    }
    handleUpdateInput(inputForms) {
        this.setState({inputForms});
    }
    updateCanAddPerson() {
        this.setState({
            canAddPerson: true
        });
    }
    handleSignUp() {
        let personArray = [];
        const personObj = this.state.signUpPersonInfo;
        const mobileReg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
        const nameReg = /([0-9])/;
        let isValid = true;
        for (let item in personObj) {
            if (personObj[item].name !== '' && personObj[item].tel !== '') {
                personArray.push(personObj[item]);
            }

            if (!personObj[item].name || !personObj[item]) {
                console.log('请填写全部手机号和姓名');
                isValid = false;
            }
            else if (nameReg.test(personObj[item].name)) {
                console.log('请输入正确的姓名');
                isValid = false;
            }
            else if (!mobileReg.test(personObj[item].tel)) {
                console.log('请输入正确的手机格式');
                isValid = false;
            }

        }
        if (personObj[0].name === '') {
            isValid = false;
        }
        if (isValid) {

            let obj = {
                users: personArray,
                activityId: this.props.params.id,
                needPrice: this.state.price * personArray.length
            };

            console.log(obj);
            this.postDataFn(obj);

            // this.context.router.push(`/page/active`);
        }



    }
    updateInputName(id, value) {
        const items = this.state.signUpPersonInfo;
        items[id].name = encodeURIComponent(value);
        this.setState({
            items
        });
        if (items[id].tel && items[id].tel !== '') {
            this.setState({
                canAddPerson: true
            });
        }


    }
    updateInputTel(id, value) {
        const items = this.state.signUpPersonInfo;
        items[id].tel = encodeURIComponent(value);

        this.setState({
            items
        });
        if (items[id].name && items[id].name !== '') {
            this.setState({
                canAddPerson: true
            });
        }


    }
    render() {
        const inputField = this.state.inputForms.map((Item, index)=>{
            return <Item
                id={index}
                key={index}
                inputForms={this.state.inputForms}
                handleUpdateInput={this.handleUpdateInput}
                updateInputTel={this.updateInputTel}
                updateInputName={this.updateInputName}
                updateCanAddPerson={this.updateCanAddPerson}/>
        });

        return (
            <div>
                <Header title='报名' linkTo='/page/active'></Header>
                <div className="active-signup">
                    <div className="active-signup_info">
                        <div className="active-signup_info_name">
                            <span className="active-signup_info_name_title">活动名称</span>
                            <span className="active-signup_info_name_content">{this.state.data.title}</span>
                        </div>
                        <div className="active-signup_info_price">
                            <span className="active-signup_info_price_title">活动金额</span>
                            <span className="active-signup_info_price_content">¥{this.state.data.discountPrice !== '' ? this.state.data.discountPrice : this.state.data.originPrice}</span>
                        </div>
                    </div>
                    <div className="active-signup_person">
                        <div className="active-signup_person_header">
                            <span className="active-signup_person_header_title">预约信息</span>
                            <button className="active-signup_person_header_button" onClick={(id, evt) => this.handleAddPerson(this.state.inputForms.length, evt)}>添加人员</button>
                        </div>
                        {inputField}
                    </div>
                </div>
                <button className="active-signup_button" onClick={this.handleSignUp}>提交</button>
            </div>
        );
    }
}

// ReactDOM.render(<ActiveSignUp/>, document.getElementById('root'));
