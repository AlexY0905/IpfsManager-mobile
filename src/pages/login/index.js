// 移动端登录页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import { Button, InputItem, Toast } from 'antd-mobile';
import { actionCreator } from './store/index'
import { Link } from 'react-router-dom'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            hasError: false
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.clickLoginBtn = this.clickLoginBtn.bind(this)
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
    clickLoginBtn() {
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
            let values = {
                name,
                password
            }
            // console.log(11111111111, values)
            this.props.handleLogin(values)
        }
    }



    render() {
        return (
            <div className='login'>
                <div className="login_wrap">
                    <div className="title_wrap">
                        <span>管理员登录</span>
                    </div>
                    <div className="box-ipt username_ipt">
                        <InputItem
                            error={this.state.hasError}
                            placeholder="请输入用户名"
                            onChange={this.onChangeUsername}
                            style={{ fontSize: '15px' }}
                        >
                            {/* 用户名 */}
                        </InputItem>
                    </div>
                    <div className="box-ipt password_ipt">
                        <InputItem
                            error={this.state.hasError}
                            type='password'
                            placeholder="请输入密码"
                            onChange={this.onChangePassword}
                            style={{ fontSize: '15px' }}
                        >
                            {/* 密 码 */}
                        </InputItem>
                    </div>
                    <div className="box-ipt btn_wrap">
                        <Button type="primary" onClick={this.clickLoginBtn} style={{width: '100%'}}>登录</Button>
                    </div>
                    {
                        /*
                        <div className="goRegister_wrap">
                            <span><Link to="/register">没有账号? 去注册</Link></span>
                        </div>
                         */
                    }

                </div>
            </div>
        )
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get("login").get("isLoading")
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLogin: (values) => {
        // 派发action处理用户注册数据
        dispatch(actionCreator.handleLoginAction(values))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
