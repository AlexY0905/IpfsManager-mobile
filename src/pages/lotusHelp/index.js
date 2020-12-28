// lotus部署页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { Button, Tabs, Steps, List, Checkbox } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'

const Step = Steps.Step;
const CheckboxItem = Checkbox.CheckboxItem;

let timer = null
class LotusHelp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectedDataList: [],
            bianYiBtn: false,
            tongBuQuKuaiBtn: false,
            chuShiHuaKuangGongBtn: false,
            qiDongKuangGongBtn: false,
            qiDongWorkerBtn: false,
            benchceshiBtn: false
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.handleDeployBtn = this.handleDeployBtn.bind(this)
        this.serverOnChange = this.serverOnChange.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表
        this.props.handleGetServerHostData()
    }
    onOpenChange(args) {
        this.setState({ open: !this.state.open });
    }
    handleDeployBtn(type) {
        if (timer != null) {
            clearInterval(timer)
        }
        console.log('type--------', type)
        let options = {
            name: '',
            servers: this.state.selectedDataList
        }
        if (type == '编译') {
            options.name = 'lotuscompile'
        } else if (type == '同步区块') {

        } else if (type == '初始化矿工') {

        } else if (type == '启动矿工') {

        } else if (type == '启动worker') {

        } else if (type == 'bench 测试') {

        }
        // 调用发送方函数, 处理部署操作
        this.props.handleDeploy(options)
        // 十五分钟定时循环查询操作的结果
        timer = setInterval(() => {
            // 调用发送反函数
            this.props.handleGetQueryRes(options)
        }, 600000)
    }
    serverOnChange(e, item) {
        let { selectedDataList } = this.state
        let arr = selectedDataList
        if (e.target.checked) {
            this.setState({
                selectedDataList: [...selectedDataList, item]
            }, () => {
                console.log(22222222222, this.state.selectedDataList);
                arr = this.state.selectedDataList
                if (this.state.selectedDataList.length > 0) {
                    this.setState({ bianYiBtn: false, benchceshiBtn: false })
                } else {
                    this.setState({ bianYiBtn: true, benchceshiBtn: true })
                }
            })
        } else {
            arr.forEach((v, i) => {
                if (v.id == item.id) {
                    arr.splice(i, 1)
                    this.setState({
                        selectedDataList: arr
                    }, () => {
                        console.log(11111111111, this.state.selectedDataList);
                        if (this.state.selectedDataList.length > 0) {
                            this.setState({ bianYiBtn: false, benchceshiBtn: false })
                        } else {
                            this.setState({ bianYiBtn: true, benchceshiBtn: true })
                        }
                    })
                }
            })
        }

    }



    render() {
        let one = () => (
            <svg t="1607914394948" className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="22" height="22">
                <defs>
                    <style type="text/css"></style>
                </defs>
                <path
                    d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m56.32 768h-64V339.84L422.4 427.52 384 387.84 512 256h56.32z"
                    fill="#1296db" p-id="1725">
                </path>
            </svg>
        )
        let two = () => (
            <svg t="1607914934484" className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="22" height="22">
                <defs>
                    <style type="text/css"></style>
                </defs>
                <path
                    d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m169.6 768H352.64v-50.56C524.8 576 618.88 491.52 618.88 404.48A91.52 91.52 0 0 0 518.4 311.68a156.8 156.8 0 0 0-128 64l-38.4-40.32A200.96 200.96 0 0 1 518.4 256a148.48 148.48 0 0 1 160.64 148.48c0 103.04-99.2 196.48-232.32 307.84h234.88z"
                    fill="#1296db" p-id="2062">
                </path>
            </svg>
        )
        let three = () => (
            <svg t="1607915027263" className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="22" height="22">
                <defs>
                    <style type="text/css"></style>
                </defs>
                <path
                    d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m12.16 768a202.88 202.88 0 0 1-172.16-81.92l35.84-38.4a167.04 167.04 0 0 0 135.04 64c70.4 0 113.28-36.48 113.28-92.8s-49.28-86.4-120.32-86.4h-50.56v-55.68h49.92c64 0 112.64-24.32 112.64-81.92S576 311.04 520.32 311.04a163.2 163.2 0 0 0-128 60.16l-33.92-38.4A206.72 206.72 0 0 1 524.8 256c92.8 0 163.84 48 163.84 131.84a118.4 118.4 0 0 1-104.32 115.2 128 128 0 0 1 112 122.88C696.96 707.84 631.04 768 524.16 768z"
                    fill="#1296db" p-id="2255">
                </path>
            </svg>
        )
        let four = () => (
            <svg t="1607915106836" className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                <defs>
                    <style type="text/css"></style>
                </defs>
                <path
                    d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m192 640H631.04v128h-64v-128H320v-54.4L542.08 256h88.96v326.4H704z"
                    fill="#1296db" p-id="2448">
                </path>
                <path d="M566.4 582.4V314.88L384.64 582.4h181.76z" fill="#1296db" p-id="2449"></path>
            </svg>
        )
        let five = () => (
            <svg t="1607915232917" className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                <defs>
                    <style type="text/css"></style>
                </defs>
                <path
                    d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m12.16 768a198.4 198.4 0 0 1-172.16-80.64l37.12-42.24a158.72 158.72 0 0 0 135.04 64A106.88 106.88 0 0 0 640 604.16a104.32 104.32 0 0 0-115.2-108.16 154.24 154.24 0 0 0-112.64 46.72l-44.8-16V256h298.88v55.68H428.16v175.36a164.48 164.48 0 0 1 114.56-45.44 151.68 151.68 0 0 1 156.16 160.64A163.2 163.2 0 0 1 524.16 768z"
                    fill="#1296db" p-id="2642">
                </path>
            </svg>
        )
        let { serverhostlist, deployMsg, name } = this.props
        const tabs = [ // 选项卡切换
            { title: '部署' },
            // { title: '测试' }
        ]
        if (deployMsg != '') {
            if (name == 'lotuscompile') {
                this.setState({ bianYiBtn: true, tongBuQuKuaiBtn: false })
            }
        }


        let renderContent = tabs.map((item, index) => (
            <div style={{ margin: '0 auto' }}>
                {
                    item.title == '部署' && (
                        <div className="step_wrap" style={{ padding: '5px' }}>
                            <Steps current={0}>
                                <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('编译')} disabled={this.state.bianYiBtn}>编译</Button>} icon={one()} />
                                <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('同步区块')} disabled={this.state.tongBuQuKuaiBtn}>同步区块</Button>} icon={two()} />
                                <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('初始化矿工')} disabled={this.state.chuShiHuaKuangGongBtn}>初始化矿工</Button>} icon={three()} />
                                <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('启动矿工')} disabled={this.state.qiDongKuangGongBtn}>启动矿工</Button>} icon={four()} />
                                <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('启动worker')} disabled={this.state.qiDongWorkerBtn}>启动 worker</Button>} icon={five()} />
                            </Steps>
                        </div>
                    )
                    ||
                    item.title == '测试' && (
                        <div style={{ padding: '30px 0', display: 'flex', justifyContent: 'center' }}><Button style={{ marginTop: '20px auto', width: '150px' }} type="primary" size="small" onClick={() => this.handleDeployBtn('bench 测试')} disabled={this.state.benchceshiBtn}>bench 测试</Button></div>
                    )
                }
            </div>
        ))

        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="lotus部署" />
                    <div className="content" style={{ paddingTop: '46px' }}>
                        <div>
                            <Tabs tabs={tabs} swipeable={false} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} onTabClick={this.handleTabsOnChange} />}>
                                {renderContent && renderContent}
                            </Tabs>
                        </div>
                        {
                            /*
                            <div className="ip_wrap">
                                <div>
                                    <List renderHeader={() => '服务器IP地址'}>
                                        {
                                            serverhostlist.toJS().length > 0 && serverhostlist.toJS().map(item => (
                                                <CheckboxItem key={item.id} onChange={(e) => this.serverOnChange(e, item)}>
                                                    {item.host}
                                                </CheckboxItem>
                                            ))
                                        }
                                    </List>
                                </div>
                            </div>
                             */
                        }
                    </div>
                </div>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于lotusHelp页面 store中的所有数据
    serverhostlist: state.get('lotusHelp').get('serverhostlist'),
    deployMsg: state.get('lotusHelp').get('deployMsg'),
    name: state.get('lotusHelp').get('name')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    // （handleGetServerHostData）自定义这个函数名 用这个函数名派发action
    handleGetServerHostData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerHostDataAction())
    },
    handleDeploy: (options) => { // 处理部署操作
        dispatch(actionCreator.handleDeployAction(options))
    },
    handleGetQueryRes: (options) => { // 处理部署操作的返回信息
        dispatch(actionCreator.handleGetQueryResAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LotusHelp)
