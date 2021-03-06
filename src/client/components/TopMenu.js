import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from 'antd';
import '../app.css';

class TopMenu extends Component {
    state = { current: "list" };
    handleClick = (e) => {
        const { dispatch } = this.props;
        dispatch({ type: "UPDATE_MENU", payload: e.key });
    }
    render() {
        const { menus: { options, picked } } = this.props;
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[picked]}
                mode="horizontal"
                theme="dark"
                style={{ lineHeight: '64px' }}
            >
                {
                    options.map((option, index) => (
                        <Menu.Item key={option}>
                            <Link to={index === 0 ? "/" : `/${option}`}>{option.toUpperCase()} </Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
        );
    }
}

export default connect(({ menus }) => ({ menus }))(TopMenu);