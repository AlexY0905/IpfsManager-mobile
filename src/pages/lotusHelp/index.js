// lotus部署页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import {Button, Tabs, Steps, List, Checkbox, Modal, InputItem, Toast} from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'

const Step = Steps.Step;
const CheckboxItem = Checkbox.CheckboxItem;

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
let timer = null
let isDeployMsgModal = true
let isOneRender = true
class LotusHelp extends Component {
    constructor(props) {
        super(props)
        this.upLoadIpt = React.createRef()
        this.state = {
            open: false,
            name: '',
            selectedDataList: [],
            bianYiBtn: true,
            shouHuBtn: true,
            tongBuQuKuaiBtn: true,
            chuShiHuaKuangGongBtn: true,
            qiDongKuangGongBtn: true,
            qiDongWorkerBtn: true,
            benchceshiBtn: true,
            benchCompile: true,
            isUpLoadBtn: true,
            deployMsgModal: false,
            workRunModal: false,
            process: '',
            benchCeShiBtnModal: false,
            benchCeShiIptVal: '',
            benchBianYiBtnModal: false,
            benchBianYiIptVal: ''
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.handleDeployBtn = this.handleDeployBtn.bind(this)
        this.serverOnChange = this.serverOnChange.bind(this)
        // this.handleUpLoadBtn = this.handleUpLoadBtn.bind(this)
        this.handleUpLoadIpt = this.handleUpLoadIpt.bind(this)
        this.handleDeployResBtn = this.handleDeployResBtn.bind(this)
        this.onWrapTouchStart = this.onWrapTouchStart.bind(this)
        this.deployMsgModalClose = this.deployMsgModalClose.bind(this)
        this.onCloseWorkRunModal = this.onCloseWorkRunModal.bind(this)
        this.handleWorkRunIpt = this.handleWorkRunIpt.bind(this)
        this.workRuModalOkBtn = this.workRuModalOkBtn.bind(this)

        this.handleBenchCeShiModalCancel = this.handleBenchCeShiModalCancel.bind(this)
        this.handleBenchCeShiModalOk = this.handleBenchCeShiModalOk.bind(this)
        this.handleBenchCeShiIpt = this.handleBenchCeShiIpt.bind(this)

        this.handleBenchBianYiModalCancel = this.handleBenchBianYiModalCancel.bind(this)
        this.handleBenchBianYiModalOk = this.handleBenchBianYiModalOk.bind(this)
        this.handleBenchBianYiIpt = this.handleBenchBianYiIpt.bind(this)


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
        isOneRender = true
        let options = {
            name: '',
            servers: this.state.selectedDataList
        }
        if (type == '编译') {
            options.name = 'lotuscompile'
            this.setState({name: 'lotuscompile', bianYiBtn: true})
            window.localStorage.setItem("commandName", 'lotuscompile')
        } else if (type == '进程守护') {
            options.name = 'lotusdaemon'
            this.setState({name: 'lotusdaemon', shouHuBtn: true})
            window.localStorage.setItem("commandName", 'lotusdaemon')
        } else if (type == '初始化矿工') {
            options.name = 'minerinit'
            this.setState({name: 'minerinit', chuShiHuaKuangGongBtn: true})
            window.localStorage.setItem("commandName", 'minerinit')
        } else if (type == '启动矿工') {
            options.name = 'minerrun'
            this.setState({name: 'minerrun', qiDongKuangGongBtn: true})
            window.localStorage.setItem("commandName", 'minerrun')
        } else if (type == '启动worker') {
            options.name = 'workerrun'
            this.setState({name: 'workerrun', qiDongWorkerBtn: true, workRunModal: true})
            window.localStorage.setItem("commandName", 'workerrun')
            return false
        } else if (type == 'bench 编译') {
            options.name = 'benchcompile'
            this.setState({name: 'benchcompile', benchCompile: true, benchBianYiBtnModal: true})
            window.localStorage.setItem("commandName", 'benchcompile')
            return false
        } else if (type == 'bench 测试') {
            options.name = 'benchrun'
            this.setState({name: 'benchrun', benchceshiBtn: true, benchCeShiBtnModal: true})
            window.localStorage.setItem("commandName", 'benchrun')
            return false
        }
        // 调用发送方函数, 处理部署操作
        this.props.handleDeploy(options)
    }
    serverOnChange(e, item) {
        let { selectedDataList } = this.state
        let arr = selectedDataList
        if (e.target.checked) {
            this.setState({
                selectedDataList: [...selectedDataList, item]
            }, () => {
                console.log(22222222222, this.state.selectedDataList);
                window.localStorage.setItem("commandHostList", JSON.stringify(this.state.selectedDataList))
                arr = this.state.selectedDataList
                if (this.state.selectedDataList.length > 0) {
                    this.setState({ bianYiBtn: false, benchCompile: false, isUpLoadBtn: false })
                } else {
                    this.setState({ bianYiBtn: true, benchCompile: true, isUpLoadBtn: true })
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
                        window.localStorage.setItem("commandHostList", JSON.stringify(this.state.selectedDataList))
                        if (this.state.selectedDataList.length > 0) {
                            this.setState({ bianYiBtn: false, benchCompile: false, isUpLoadBtn: false })
                        } else {
                            this.setState({ bianYiBtn: true, benchCompile: true, isUpLoadBtn: true })
                        }
                    })
                }
            })
        }
    }
    handleUpLoadIpt () {
        if (this.upLoadIpt.current && this.upLoadIpt.current.files.length > 0) {
            // 创建一个FormData空对象，然后使用append方法添加 key / value
            var fd = new FormData();
            for (let i = 0; i < this.upLoadIpt.current.files.length; i++) {
                fd.append('file',this.upLoadIpt.current.files[i]);
            }
            console.log(':::-----', fd.getAll('file'));
            // 调用发送方函数, 处理文件上传
            // let options = {file: fd}
            this.props.handleUpLoad(fd)
        }
    }
    handleDeployResBtn () {
        if (!window.localStorage.getItem("commandName")) {
            Toast.fail('当前没有执行的机器', 1);
            return false
        }
        let options = {
            name: window.localStorage.getItem("commandName"),
            servers: JSON.parse(window.localStorage.getItem("commandHostList"))
        }
        // 调用发送方函数, 处理查看执行结果
        this.props.handleGetQueryRes(options)
    }
    onWrapTouchStart (e) {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    deployMsgModalClose () {
        this.setState({deployMsgModal: false})
    }
    onCloseWorkRunModal () {
        this.setState({workRunModal: false})
    }
    handleWorkRunIpt (val) {
        console.log(12312312312, val)
        this.setState({process: val})
    }
    workRuModalOkBtn () {
        let options = {
            name: 'workerrun',
            process: this.state.process,
            servers: this.state.selectedDataList
        }
        // 调用发送方函数, 处理部署操作
        this.props.handleDeploy(options)
        this.setState({workRunModal: false})
    }

    handleBenchCeShiModalCancel () {
        this.setState({benchCeShiBtnModal: false})
    }
    handleBenchCeShiModalOk () {
        let options = {
            name: 'benchrun',
            process: this.state.benchCeShiIptVal,
            servers: this.state.selectedDataList
        }
        // 调用发送方函数, 处理部署
        this.props.handleDeploy(options)
        this.setState({benchCeShiBtnModal: false})
    }
    handleBenchCeShiIpt (val) {
        this.setState({benchCeShiIptVal: val})
    }

    handleBenchBianYiModalCancel () {
        this.setState({benchBianYiBtnModal: false})
    }
    handleBenchBianYiModalOk () {
        let options = {
            name: 'benchcompile',
            process: this.state.benchBianYiIptVal,
            servers: this.state.selectedDataList
        }
        // 调用发送方函数, 处理部署
        this.props.handleDeploy(options)
        this.setState({benchBianYiBtnModal: false})
    }
    handleBenchBianYiIpt (val) {
        this.setState({benchBianYiIptVal: val})
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
        let { serverhostlist, deployMsg, queryResCode, queryResName, queryResMsg } = this.props
        const tabs = [ // 选项卡切换
            { title: '部署' },
            { title: '测试' },
            { title: '结果' }
        ]
        let deployMsgHtml = null
        if (deployMsg.toJS().length > 0) {
            if (isDeployMsgModal) {
                this.setState({deployMsgModal: true})
                isDeployMsgModal = false
            }
            deployMsgHtml = deployMsg.toJS().map((item, index) => (
                <div>
                    {
                        item.Result && (
                            <p>{item.Host} 执行成功</p>
                        )
                        ||
                        (
                            <p style={{color: 'red'}}>{item.Host} 执行失败</p>
                        )
                    }
                </div>
            ))
        } else if (queryResMsg.toJS().length > 0) {
            if (isDeployMsgModal) {
                this.setState({deployMsgModal: true})
                isDeployMsgModal = false
            }
            deployMsgHtml = queryResMsg.toJS().map((item, index) => (
                <div>
                    {
                        item.Code == 0 && (
                            <p>{item.Host} 执行成功</p>
                        )
                        ||
                        item.Code == 1 && (
                            <p style={{color: 'red'}}>{item.Host} 执行失败</p>
                        )
                        ||
                        item.Code == 2 && (
                            <p>{item.Host} 正在执行中,稍后再看</p>
                        )
                        ||
                        item.Code == 3 && (
                            <p>{item.Host} 查询失败</p>
                        )
                    }
                </div>
            ))
        }

        if (isOneRender && queryResCode == 0 && queryResName != '') { // 执行成功 改变按钮状态
            if (queryResName == 'lotuscompile') {
                this.setState({shouHuBtn: false})
            } else if (queryResName == 'lotusdaemon') {
                this.setState({qiDongKuangGongBtn: false})
            } else if (queryResName == 'minerrun') {
                this.setState({qiDongWorkerBtn: false})
            } else if (queryResName == 'workerrun') {
                this.setState({lotuscompile: false})
            } else if (queryResName == 'benchcompile') {
                this.setState({benchceshiBtn: false})
            } else if (queryResName == 'benchrun') {
                this.setState({benchCompile: false})
            }
            isOneRender = false
        } else if (isOneRender && queryResCode != 0 && queryResCode != 1 && queryResName != '') { // 执行失败 改变按钮状态
            if (queryResName == 'lotuscompile') {
                this.setState({bianYiBtn: false})
            } else if (queryResName == 'lotusdaemon') {
                this.setState({shouHuBtn: false})
            } else if (queryResName == 'minerinit') {
                this.setState({chuShiHuaKuangGongBtn: false})
            } else if (queryResName == 'minerrun') {
                this.setState({qiDongKuangGongBtn: false})
            } else if (queryResName == 'workerrun') {
                this.setState({qiDongWorkerBtn: false})
            } else if (queryResName == 'benchcompile') {
                this.setState({benchCompile: false})
            } else if (queryResName == 'benchrun') {
                this.setState({benchceshiBtn: false})
            }
            isOneRender = false
        }


        let renderContent = tabs.map((item, index) => (
            <div style={{ margin: '0 auto' }}>
                {
                    item.title == '部署' && (
                        <div className="step_wrap" style={{ padding: '5px' }}>
                            <Steps current={0}>
                                <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('编译')} disabled={this.state.bianYiBtn}>编译</Button>} icon={one()} />
                                <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('进程守护')} disabled={this.state.shouHuBtn}>进程守护</Button>} icon={two()} />
                                {
                                    /*
                                    <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('初始化矿工')} disabled={this.state.chuShiHuaKuangGongBtn}>初始化矿工</Button>} icon={three()} />
                                     */
                                }
                                <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('启动矿工')} disabled={this.state.qiDongKuangGongBtn}>启动矿工</Button>} icon={four()} />
                                <Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('启动worker')} disabled={this.state.qiDongWorkerBtn}>启动 worker</Button>} icon={five()} />
                                {/*<Step description={<Button type="primary" size="small" onClick={() => this.handleDeployBtn('启动worker')}>启动 worker</Button>} icon={five()} />*/}
                            </Steps>
                        </div>
                    )
                    ||
                    item.title == '测试' && (
                        <div>
                            <div style={{ padding: '30px 0', display: 'flex', justifyContent: 'center' }}><Button style={{ marginTop: '20px auto', width: '150px' }} type="primary" size="small" onClick={() => this.handleDeployBtn('bench 编译')} disabled={this.state.benchCompile}>bench 编译</Button></div>
                            <div style={{ padding: '30px 0', display: 'flex', justifyContent: 'center' }}><Button style={{ marginTop: '20px auto', width: '150px' }} type="primary" size="small" onClick={() => this.handleDeployBtn('bench 测试')} disabled={this.state.benchceshiBtn}>bench 测试</Button></div>
                        </div>
                    )
                    ||
                    item.title == '结果' && (
                        <div style={{ padding: '30px 0', display: 'flex', justifyContent: 'center' }}><Button style={{ marginTop: '20px auto', width: '150px' }} type="primary" size="small" onClick={() => this.handleDeployResBtn()}>查看执行结果</Button></div>
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
                        <div style={{position: 'relative'}}>
                            <input ref={this.upLoadIpt} style={{zIndex: '999'}} className='upload_ipt' type='file' multiple onChange={this.handleUpLoadIpt} />
                            <Button className='upload_btn' style={{zIndex: '99'}} type="primary" size='small' multiple>脚本上传</Button>
                        </div>
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
                        {
                            deployMsgHtml != null && (
                                <div className="deployMsg_wrap">
                                    <Modal
                                        visible={this.state.deployMsgModal}
                                        transparent
                                        maskClosable={false}
                                        title="结果"
                                        footer={[{ text: 'Ok', onPress: () => { this.deployMsgModalClose() } }]}
                                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                        <div style={{ height: 100, overflow: 'scroll' }}>
                                            { deployMsgHtml }
                                        </div>
                                    </Modal>
                                </div>
                            )
                        }
                        <Modal
                            transparent={true}
                            visible={this.state.workRunModal}
                            onClose={this.onCloseWorkRunModal}
                            animationType="slide-up"
                            afterClose={() => { console.log('afterClose'); }}
                        >
                            <div>
                                <InputItem style={{border: '1px solid #ccc'}} placeholder="输入节点" onChange={this.handleWorkRunIpt} style={{ fontSize: '15px' }}></InputItem>
                            </div>
                            <div><Button type="primary" size='small' onClick={this.workRuModalOkBtn}>编译</Button></div>
                        </Modal>
                        <Modal
                            transparent={true}
                            visible={this.state.benchCeShiBtnModal}
                            onClose={this.handleBenchCeShiModalCancel}
                            animationType="slide-up"
                            afterClose={() => { console.log('afterClose'); }}
                        >
                            <div>
                                <InputItem style={{border: '1px solid #ccc'}} placeholder="输入节点" onChange={this.handleBenchCeShiIpt} style={{ fontSize: '15px' }}></InputItem>
                            </div>
                            <div><Button type="primary" size='small' onClick={this.handleBenchCeShiModalOk}>执行</Button></div>
                        </Modal>
                        <Modal
                            transparent={true}
                            visible={this.state.benchBianYiBtnModal}
                            onClose={this.handleBenchBianYiModalCancel}
                            animationType="slide-up"
                            afterClose={() => { console.log('afterClose'); }}
                        >
                            <div>
                                <InputItem style={{border: '1px solid #ccc'}} placeholder="输入节点" onChange={this.handleBenchBianYiIpt} style={{ fontSize: '15px' }}></InputItem>
                            </div>
                            <div><Button type="primary" size='small' onClick={this.handleBenchBianYiModalOk}>执行</Button></div>
                        </Modal>
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
    name: state.get('lotusHelp').get('name'),
    queryResName: state.get('lotusHelp').get('queryResName'),
    queryResCode: state.get('lotusHelp').get('queryResCode'),
    queryResMsg: state.get('lotusHelp').get('queryResMsg')
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
    },
    handleUpLoad: (options) => { // 处理脚本文件上传
        dispatch(actionCreator.handleUpLoadAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LotusHelp)
