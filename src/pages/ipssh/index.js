// 批量命令页面
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { Button, Drawer, List, NavBar, Icon } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'


class Ipssh extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.onOpenChange = this.onOpenChange.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表
        // this.props.handleGetServerHostData()
    }
    onOpenChange(args) {
        console.log(':::::::--------', args);
        this.setState({ open: !this.state.open });
    }




    render() {

        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="批量命令" />
                    <div className="content" style={{ marginTop: '100px' }}>
                        欢迎来到批量命令页面
                    </div>
                </div>
            </div>
        );
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get('ipssh').get('isLoading'),
    serverhostlist: state.get('ipssh').get('serverhostlist'),
    ipsshtxt: state.get('ipssh').get('ipsshtxt')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetServerHostData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerHostDataAction())
    },
    handleIpSsh: (options) => { // 处理服务器的批量命令
        dispatch(actionCreator.handleIpSshAction(options))
    },
    handleDownFile: (options) => { // 处理文件的下载
        dispatch(actionCreator.handleDownFileAction(options))
    },
    handleUpLoadFile: (options) => { // 处理文件的上传
        dispatch(actionCreator.handleUpLoadFileAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Ipssh)