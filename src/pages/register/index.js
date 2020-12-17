// 注册页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import { Button, InputItem, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom'
import { actionCreator } from './store/index'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.clickRegisterBtn = this.clickRegisterBtn.bind(this)
    }

    onChangeUsername(val) {
        console.log(1111111111, val)
        this.setState({
            name: val
        })
    }
    onChangePassword(val) {
        console.log(2222222222, val)
        this.setState({
            password: val
        })
    }
    clickRegisterBtn() {
        const { name, password } = this.state
        if (name == '') {
            this.setState({
                hasError: true
            })
            Toast.fail('用户名不能为空 !', 1);
            return false
        } else if (password == '') {
            this.setState({
                hasError: true
            })
            Toast.fail('密码不能为空 !', 1);
            return false
        } else {
            var reg = /(^\s+)|(\s+$)|\s+/g;
            if (name == "insert" || password == "insert") {
                Toast.fail('输入的有非法字符,请重新输入', 1);
                return false
            } else if (name == "update" || password == "update") {
                Toast.fail('输入的有非法字符,请重新输入', 1);
                return false
            } else if (name == "or" || password == "or") {
                Toast.fail('输入的有非法字符,请重新输入', 1);
                return false
            } else if (name == "and" || password == "and") {
                Toast.fail('输入的有非法字符,请重新输入', 1);
                return false
            } else if (reg.test(name) || reg.test(password)) {
                Toast.fail('输入的有非法字符,请重新输入', 1);
                return false
            } else if (name == 'drop' || password == 'drop') {
                Toast.fail('输入的有非法字符,请重新输入', 1);
                return false
            } else {
                // 调用发送方中处理注册用户函数
                let values = {
                    name,
                    password
                }
                // console.log(111111111111, values)
                this.props.handleRegister(values)
            }
        }
    }

    render() {
        return (
            <div className='regsiter'>
                <div className="register_wrap">
                    <div className="box-ipt username_ipt">
                        <InputItem
                            className=""
                            placeholder="请输入用户名"
                            onChange={this.onChangeUsername}
                            style={{ fontSize: '15px' }}
                        >
                            {/* 用户名 */}
                        </InputItem>
                    </div>
                    <div className="box-ipt password_ipt">
                        <InputItem
                            type='password'
                            placeholder="请输入密码"
                            onChange={this.onChangePassword}
                            style={{ fontSize: '15px' }}
                        >
                            {/* 密 码 */}
                        </InputItem>
                    </div>
                    <div className="box-ipt btn_wrap">
                        <Button type="primary" onClick={this.clickRegisterBtn} style={{width: '100%'}}>添加管理员</Button>
                    </div>
                    <div className="goLogin_wrap">
                        <span><Link to="/login">已有账号? 去登录</Link></span>
                    </div>
                </div>
            </div>
        );
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get("register").get("isLoading")
})

// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleRegister: (values) => {
        // 派发action处理用户注册数据
        dispatch(actionCreator.handleRegisterAction(values))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)
