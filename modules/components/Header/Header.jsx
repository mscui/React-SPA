import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'Header.less';

import { Router, Route, Link, browserHistory } from 'react-router'

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="header">
                <Link to={this.props.linkTo} className="header_goback">
                    <button className="header_goback"></button>
                </Link>

                <p className="header_title">{this.props.title}</p>
            </div>
        )
    }
}

export default Header;