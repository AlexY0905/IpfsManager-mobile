// 分组批量命令页面
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import {Button, Drawer, List, NavBar, Icon, InputItem, Toast, Accordion, Checkbox} from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'

const CheckboxItem = Checkbox.CheckboxItem;


class Grouping extends Component {
    constructor(props) {
        super(props)
        this.textAreaIpt = React.createRef()
        this.state = {
            open: false,
            upLoadDisable: true,
            fileAddress: '',
            groupSelectedDataList: [],
            commandVal: '',
            downLoadBtnDisable: true,
            downLoadFileAddress: ''
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.handlefileAddress = this.handlefileAddress.bind(this)
        this.handleUpLoadBtn = this.handleUpLoadBtn.bind(this)
        this.groupOnChange = this.groupOnChange.bind(this)
        this.handleCommandVal = this.handleCommandVal.bind(this)
        this.handleDownLoadFile = this.handleDownLoadFile.bind(this)
        this.handleDownLoadfileAddress = this.handleDownLoadfileAddress.bind(this)
        this.handleSubmitCommandBtn = this.handleSubmitCommandBtn.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示组名列表
        this.props.handleGetGroupList()
    }
    onOpenChange(args) {
        console.log(':::::::--------', args);
        this.setState({ open: !this.state.open });
    }
    // -------------------------------------------------文件上传功能-----------------------------------------------------
    handlefileAddress(val) { // 获取上传地址输入框中数据
        console.log(111111111111, val)
        // 利用setState方法的回调函数, 可以实时的拿到最新的state中的值, 以用来最新的判断
        this.setState({ fileAddress: val, upLoadDisable: false }, () => {
            // 改变状态的时候做个判断 如果输入框为空 就禁止上传 否则就可以上传
            if (this.state.fileAddress == '') { // 上传地址为空
                this.setState({ // 改变上传按钮的状态, 设置为禁止上传状态
                    upLoadDisable: true
                })
            } else { // 上传地址不为空
                this.setState({ // 改变上传按钮的状态, 设置为允许上传状态
                    upLoadDisable: false
                })
            }
        })

    }
    handleUpLoadBtn() { // 处理上传按钮的点击事件
        const { fileAddress, groupSelectedDataList } = this.state
        if (fileAddress == '') { // 判断有没有填写上传的地址, 如果没有, 就提示用户信息
            Toast.fail('请填写文件上传的地址')
            return false
        } else if (groupSelectedDataList.length == 0) { // 判断有没有选中ip地址, 如果没有, 就提示用户信息
            Toast.fail('请选中需要上传的ip')
            return false
        } else { // 填写了上传地址和选中了需要上传的ip
            // 调用发送方, 处理文件上传
            let options = {
                path: fileAddress,
                ipAddress: groupSelectedDataList
            }
            console.log(222222222222, options);
            return
            this.props.handleUpLoadFile(options)
        }
    }
    // -------------------------------------------------文件下载功能-----------------------------------------------------
    handleDownLoadfileAddress(val) { // 获取下载地址输入框中数据
        console.log(2222222222, val)
        // 利用setState方法的回调函数, 可以实时的拿到最新的state中的值, 以用来最新的判断
        this.setState({ downLoadFileAddress: val, downLoadBtnDisable: false }, () => {
            // 改变状态的时候做个判断 如果输入框为空 就禁止下载 否则就可以下载
            if (this.state.downLoadFileAddress == '') { // 下载地址为空
                this.setState({
                    downLoadBtnDisable: true // 改变下载按钮的状态, 设置为禁止下载状态
                })
            } else { // 下载地址不为空
                this.setState({
                    downLoadBtnDisable: false // 改变下载按钮的状态, 设置为允许下载状态
                })
            }
        })
    }
    handleDownLoadFile() { // 处理下载文件按钮的点击事件
        const { downLoadFileAddress, groupSelectedDataList } = this.state
        if (downLoadFileAddress == '') { // 判断有没有填写下载的地址, 如果没有, 就提示用户信息
            Toast.fail('请填写文件下载的地址')
            return false
        } else if (groupSelectedDataList.length == 0) { // 判断有没有选中ip地址, 如果没有, 就提示用户信息
            Toast.fail('请选中需要下载的ip')
            return false
        } else { // 判断有没有填写下载的地址, 如果有, 就调用发送方函数, 处理文件的下载
            // 调用发送方, 处理文件上传
            let options = {
                path: downLoadFileAddress,
                ipAddress: groupSelectedDataList
            }
            console.log(222222222222, options);
            return
            // 调用发送方函数, 处理文件的下载
            this.props.handleDownFile(options)
        }
    }
    groupOnChange(e, item) {
        console.log(':::::::::::---------', e);
        console.log(':::::::::::---------', item)
        let { groupSelectedDataList } = this.state
        let arr = groupSelectedDataList
        if (e.target.checked) {
            this.setState({
                groupSelectedDataList: [...groupSelectedDataList, item]
            }, () => {
                console.log('删除------------1111111', this.state.groupSelectedDataList);
                arr = this.state.groupSelectedDataList
            })
        } else {
            arr.forEach((v, i) => {
                if (v.id == item.id) {
                    arr.splice(i, 1)
                    this.setState({
                        groupSelectedDataList: arr
                    }, () => {
                        console.log('删除------------222222', this.state.groupSelectedDataList);
                    })
                }
            })
        }
    }
    handleCommandVal (val) {
        this.setState({commandVal: val})
    }
    // -------------------------------------------------批量命令功能---------------------------------------------------
    handleSubmitCommandBtn(e) { // 处理点击提交命令按钮的事件
        let { groupSelectedDataList, commandVal } = this.state
        console.log('::::::------', commandVal)
        // 获取文本框中的值
        if (commandVal == '') {
            Toast.fail('指令不能为空 !')
            return false
        } else if (groupSelectedDataList.length == 0) {
            Toast.fail('请选择需要的 ip')
            return false
        }
        groupSelectedDataList.forEach((item, index) => {
            if (item['children']) {
                groupSelectedDataList.splice(index, 1)
            }
        })
        let options = {
            servers: groupSelectedDataList,
            cmds: commandVal
        }
        // 清空文本输入框
        // this.textAreaIpt.current.state.value = ''
        // 调用发送方函数, 处理服务器的批量命令
        console.log(111111111111, options)
        // return
        this.props.handleIpSsh(options)
    }



    render() {
        const { ipsshtxt, groupList } = this.props
        let groupDataList = []
        if (groupList.toJS().length > 0) {
            console.log(111111111, groupList.toJS());
            groupDataList = groupList.toJS().map((item, index) => {
                if (item.Title.Servers == null) {
                    item.Title.Servers = []
                }
                let itemList = item.Title.Servers.map((v, i) => {
                    return (
                        <CheckboxItem key={i} onChange={(e) => this.groupOnChange(e, v)} chec>
                            {v.host}
                        </CheckboxItem>
                    )
                })
                return (
                    <Accordion className="my-accordion">
                        {/* <Accordion.Panel header={<CheckboxItem key={index} onChange={(e) => this.allCheckedOnChange(e, item.Title.Name)}>{item.Title.Name}</CheckboxItem>}> */}
                        <Accordion.Panel header={item.Title.Name}>
                            <List className="my-list">
                                {
                                    itemList
                                }
                                <List.Item>
                                    <button className='handleBtn' data-Id={item.Id} data-name={item.Title.Name} onClick={this.handleEditShowModal}>编辑</button>
                                    <button className='handleBtn' data-Id={item.Id} data-name={item.Title.Name} onClick={this.handleDistributionGroup}>分配组</button>
                                    <button className='handleBtn' style={{ background: '#e94f4f', border: '1px solid #e94f4f' }} data-Id={item.Id} data-name={item.Title.Name} onClick={this.handleDelBtn}>删除</button>
                                </List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                )
            })
        }
        let ipsshtxtArr = []
        ipsshtxt.toJS().map((item, index) => {
            return item.Result.map((v, i) => {
                if (i == 0) {
                    ipsshtxtArr.push(<h2 style={{ color: 'red' }}>{v}</h2>)
                } else if (v == 'file is existed') {
                    ipsshtxtArr.push(<h3 style={{ color: 'red' }}>{v}</h3>)
                } else {
                    ipsshtxtArr.push(<p style={{ color: "#fff" }}>{v}</p>)
                }
            })
        })

        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="分组批量命令" />
                    <div className="content" style={{paddingTop: '50px'}}>
                        <div className='fileUpload_wrap'>
                            <InputItem clear={true} placeholder="输入上传的地址" onChange={this.handlefileAddress} style={{ fontSize: '15px' }}></InputItem>
                            <Button style={{marginTop: '5px'}} disabled={this.state.upLoadDisable} type="primary" size="small" onClick={this.handleUpLoadBtn}>上传</Button>
                        </div>
                        <div className='fileUpload_wrap'>
                            <InputItem clear={true} placeholder="输入下载的地址" onChange={this.handleDownLoadfileAddress} style={{ fontSize: '15px' }}></InputItem>
                            <Button style={{marginTop: '5px'}} disabled={this.state.downLoadBtnDisable} type="primary" size="small" onClick={this.handleDownLoadFile}>下载</Button>
                        </div>
                        <div className="group_wrap">
                            <div>
                                <List renderHeader={() => '分组IP'}>
                                    {
                                        groupDataList.length > 0 && groupDataList
                                    }
                                </List>
                            </div>
                        </div>
                        <div className="command_wrap">
                            <div>
                                {
                                    ipsshtxtArr.length > 0 && ipsshtxtArr
                                }
                            </div>
                        </div>
                        <div className="input_wrap">
                            <InputItem clear={true} placeholder="输入命令" onChange={this.handleCommandVal} style={{ fontSize: '15px' }}></InputItem>
                        </div>
                        <div className='fileUpload_wrap'>
                            <Button style={{marginTop: '5px'}} type="primary" onClick={this.handleSubmitCommandBtn}>提交</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get('grouping').get('isLoading'),
    groupList: state.get('grouping').get('groupList'),
    ipsshtxt: state.get('grouping').get('ipsshtxt')
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
    },
    handleGetGroupList: () => { // 处理获取组名数据列表
        dispatch(actionCreator.handleGetGroupListAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Grouping)