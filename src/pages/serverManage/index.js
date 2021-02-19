// 资产管理页面
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { Button, ListView, Accordion, List, Modal, InputItem, Toast, NavBar, Icon } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'
import Terminal from './Xterm'
const prompt = Modal.prompt;
const alert = Modal.alert;

class ServerManage extends Component {
    constructor(props) {
        super(props)
        this.terminalDom = React.createRef()
        this.state = {
            open: false,
            addModal: false,
            editModal: false,
            linkModal: false,
            hasError: false,
            addName: '',
            addUserName: '',
            addPassword: '',
            addHost: '',
            addPort: '',
            editName: '',
            editUserName: '',
            editPassword: '',
            editHost: '',
            editPort: '',
            nameHasError: false,
            usernameHasError: false,
            passwordhasError: false,
            hosthasError: false,
            porthasError: false,
            term: null,
            terminalSocket: null,
            editId: ''
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.handleAddShowModal = this.handleAddShowModal.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeHost = this.onChangeHost.bind(this)
        this.onChangePort = this.onChangePort.bind(this)
        this.handleAddModalBtn = this.handleAddModalBtn.bind(this)
        this.onCloseAdd = this.onCloseAdd.bind(this)

        this.handleEditShowModal = this.handleEditShowModal.bind(this)
        this.editOnChangeName = this.editOnChangeName.bind(this)
        this.editOnChangeUsername = this.editOnChangeUsername.bind(this)
        this.editOnChangePassword = this.editOnChangePassword.bind(this)
        this.editOnChangeHost = this.editOnChangeHost.bind(this)
        this.editOnChangePort = this.editOnChangePort.bind(this)
        this.handleEditModalBtn = this.handleEditModalBtn.bind(this)
        this.onCloseEdit = this.onCloseEdit.bind(this)

        this.handleLinkShowModal = this.handleLinkShowModal.bind(this)
        this.onCloseLink = this.onCloseLink.bind(this)
        this.handleDelShowModal = this.handleDelShowModal.bind(this)
    }

    componentDidMount() {
        // 调用发送方的数据 显示服务器列表
        this.props.handleGetServerData()
    }
    onOpenChange(args) {
        console.log(':::::::--------', args);
        this.setState({ open: !this.state.open });
    }
    /**************************************** 处理添加机器 ***********************************************/
    handleAddShowModal() {
        this.setState({
            addModal: true
        })
    }
    onChangeName(val) {
        console.log(11111111, val);
        this.setState({
            addName: val
        })
    }
    onChangeUsername(val) {
        this.setState({
            addUserName: val
        })
    }
    onChangePassword(val) {
        this.setState({
            addPassword: val
        })
    }
    onChangeHost(val) {
        this.setState({
            addHost: val
        })
    }
    onChangePort(val) {
        this.setState({
            addPort: val
        })
    }
    handleAddModalBtn() {
        const { addName, addUserName, addPassword, addHost, addPort } = this.state
        if (addName == '') {
            this.setState({
                nameHasError: true
            })
            Toast.fail('name 不能为空 !', 1);
            return false
        } else if (addUserName == '') {
            this.setState({
                usernameHasError: true
            })
            Toast.fail('username 不能为空 !', 1);
            return false
        } else if (addPassword == '') {
            this.setState({
                passwordhasError: true
            })
            Toast.fail('password 不能为空 !', 1);
            return false
        } else if (addHost == '') {
            this.setState({
                hosthasError: true
            })
            Toast.fail('host 不能为空 !', 1);
            return false
        } else if (addPort == '') {
            this.setState({
                porthasError: true
            })
            Toast.fail('port 不能为空 !', 1);
            return false
        } else {
            let options = {
                name: addName,
                username: addUserName,
                password: addPassword,
                host: addHost,
                port: addPort
            }
            console.log(111111111111, options);
            // 调用发送方函数, 处理添加服务器
            this.props.handleAddServer(options)
            this.setState({
                addModal: false,
                nameHasError: false,
                usernameHasError: false,
                passwordhasError: false,
                hosthasError: false,
                porthasError: false
            })
        }
    }
    onCloseAdd() {
        this.setState({
            addModal: false,
            nameHasError: false,
            usernameHasError: false,
            passwordhasError: false,
            hosthasError: false,
            porthasError: false
        })
    }

    /**************************************** 处理编辑机器 ***********************************************/
    handleEditShowModal(e) {
        e.persist()
        let id = e.target.dataset.id
        let serverlist = this.props.serverlist.toJS()
        let data = serverlist.filter((item, index) => { return item.id == id })[0]
        console.log("data------------", data)
        this.setState({
            editName: data.name,
            editUserName: data.username,
            editPassword: data.password,
            editHost: data.host,
            editPort: data.port,
            editModal: true,
            editId: id
        })
    }
    editOnChangeName(val) {
        console.log(11111111, val);
        this.setState({
            editName: val
        })
    }
    editOnChangeUsername(val) {
        this.setState({
            editName: val
        })
    }
    editOnChangePassword(val) {
        this.setState({
            editPassword: val
        })
    }
    editOnChangeHost(val) {
        this.setState({
            editHost: val
        })
    }
    editOnChangePort(val) {
        this.setState({
            editPort: val
        })
    }
    handleEditModalBtn() {
        const { editId, editName, editUserName, editPassword, editHost, editPort } = this.state
        if (editName == '') {
            this.setState({
                nameHasError: true
            })
            Toast.fail('name 不能为空 !', 1);
            return false
        } else if (editUserName == '') {
            this.setState({
                usernameHasError: true
            })
            Toast.fail('username 不能为空 !', 1);
            return false
        } else if (editPassword == '') {
            this.setState({
                passwordhasError: true
            })
            Toast.fail('password 不能为空 !', 1);
            return false
        } else if (editHost == '') {
            this.setState({
                hosthasError: true
            })
            Toast.fail('host 不能为空 !', 1);
            return false
        } else if (editPort == '') {
            this.setState({
                porthasError: true
            })
            Toast.fail('port 不能为空 !', 1);
            return false
        } else {
            let options = {
                id: editId,
                name: editName,
                username: editUserName,
                password: editPassword,
                host: editHost,
                port: editPort
            }
            console.log(111111111111, options);
            // 调用发送方函数, 处理编辑服务器
            this.props.handleServerEdit(options)
            this.setState({
                addModal: false,
                nameHasError: false,
                usernameHasError: false,
                passwordhasError: false,
                hosthasError: false,
                porthasError: false
            })
        }
    }
    onCloseEdit() {
        this.setState({
            editModal: false,
            nameHasError: false,
            usernameHasError: false,
            passwordhasError: false,
            hosthasError: false,
            porthasError: false
        })
    }



    /**************************************** 处理连接机器 ***********************************************/
    runRealTerminal() {
        console.log('webSocket is finished')
    }
    errorRealTerminal() {
        console.log('error')
    }
    closeRealTerminal() {
        console.log('close')
    }

    handleLinkShowModal(e) {
        e.persist()
        console.log(111111111222222, e)
        let id = e.target.dataset.id
        let serverlist = this.props.serverlist.toJS()
        let data = serverlist.filter((item, index) => { return item.id == id })[0]
        console.log(22222222222, data);
        console.log('链接')
        this.setState({ linkModal: true }, () => {
            setTimeout(() => {
                var jsonStr = `{"username":"${data.username}", "host":"${data.host}", "port":${data.port}, "password":"${data.password}"}`
                var msg = window.btoa(jsonStr)
                var containerHeight = window.screen.height;
                // var containerHeight = window.screen.width;
                var cols = Math.floor((containerHeight - 30) / 9);
                var rows = Math.floor(window.innerHeight / 10) - 2;
                console.log('cols------------', cols);
                console.log('rows-------------', rows);
                if (this.username === undefined) {
                    var url = (location.protocol === "http:" ? "ws" : "wss") + "://" + "61.147.123.88:10011" + "/ws" + "?" + "msg=" + msg + "&rows=" + rows + "&cols=" + cols;
                } else {
                    var url = (location.protocol === "http:" ? "ws" : "wss") + "://" + "61.147.123.88:10011" + "/ws" + "?" + "msg=" + msg + "&rows=" + rows + "&cols=" + cols + "&username=" + data.username + "&password=" + data.password;
                }
                let terminalContainer = this.terminalDom.current

                this.setState({
                    term: new Terminal(),
                    terminalSocket: new WebSocket(url)
                }, () => {
                    this.state.term.open(terminalContainer)
                    this.state.terminalSocket.onopen = this.runRealTerminal
                    this.state.terminalSocket.onclose = this.closeRealTerminal
                    this.state.terminalSocket.onerror = this.errorRealTerminal
                    this.state.term.attach(this.state.terminalSocket)
                    this.state.term._initialized = true
                    console.log('mounted is going on')
                })
            })
        })

    }

    onCloseLink() { // 处理链接对话框中取消按钮
        this.setState({
            linkModal: false
        })
    }



    /**************************************** 处理删除机器 ***********************************************/
    handleDelShowModal(e) {
        e.persist()
        let id = e.target.dataset.id
        const alertInstance = alert('删除', '确认删除此机器吗 ?', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确认', onPress: () => {
                    // 调用发送方函数, 处理删除机器
                    this.props.handleDelIp(id)
                }
            }
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            alertInstance.close();
        }, 500000);


    }


    render() {
        let { serverlist } = this.props
        let serverDataList = serverlist.toJS().map((item, index) => {
            return (
                <Accordion defaultActiveKey="0" className="my-accordion" style={{ marginBottom: '10px' }}>
                    <Accordion.Panel header={`IP ${item.host}`}>
                        <List className="my-list">
                            <List.Item><span>名 称 : </span><span>{item.name}</span></List.Item>
                            <List.Item><span>服务器别名 : </span><span>{item.username}</span></List.Item>
                            <List.Item><span>服务器地址 : </span><span>{item.host}</span></List.Item>
                            <List.Item><span>服务器端口 : </span><span>{item.port}</span></List.Item>
                            <List.Item>
                                <button className='handleBtn' data-Id={item.id} onClick={this.handleEditShowModal}>编辑</button>
                                <button className='handleBtn' data-Id={item.id} onClick={this.handleLinkShowModal}>链接</button>
                                <button className='handleBtn' style={{ background: '#e94f4f', border: '1px solid #e94f4f' }} data-Id={item.id} onClick={this.handleDelShowModal}>删除</button>
                            </List.Item>
                        </List>
                    </Accordion.Panel>
                </Accordion>
            )
        })
        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="资产管理" />
                    <div className="content" style={{ paddingTop: '50px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button inline size="small" style={{ width: '80px', marginRight: '5px', marginBottom: '5px' }} type="primary" onClick={this.handleAddShowModal}>添加</Button>
                        </div>
                        <div style={{ padding: '0 5px' }}>
                            {
                                serverDataList.length > 0 && serverDataList
                            }
                        </div>
                        <Modal
                            transparent={true}
                            visible={this.state.addModal}
                            onClose={this.onCloseAdd}
                            animationType="slide-up"
                            afterClose={() => { console.log('afterClose'); }}
                        >
                            <List renderHeader={() => <div>添加机器</div>} className="popup-list">
                                <List.Item>
                                    <InputItem error={this.state.nameHasError} placeholder="name" onChange={this.onChangeName} style={{ fontSize: '15px' }}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <InputItem error={this.state.usernameHasError} placeholder="username" onChange={this.onChangeUsername} style={{ fontSize: '15px' }}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <InputItem error={this.state.passwordhasError} placeholder="password" onChange={this.onChangePassword} style={{ fontSize: '15px' }}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <InputItem error={this.state.hosthasError} placeholder="host" onChange={this.onChangeHost} style={{ fontSize: '15px' }}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <InputItem error={this.state.porthasError} placeholder="port" onChange={this.onChangePort} style={{ fontSize: '15px' }}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <Button type="primary" size="small" onClick={this.handleAddModalBtn}>添加</Button>
                                </List.Item>
                            </List>
                        </Modal>
                        <Modal
                            transparent={true}
                            visible={this.state.editModal}
                            onClose={this.onCloseEdit}
                            animationType="slide-up"
                            afterClose={() => { console.log('afterClose'); }}
                        >
                            <List renderHeader={() => <div>编辑机器</div>} className="popup-list">
                                <List.Item>
                                    <InputItem error={this.state.nameHasError} placeholder="name" onChange={this.editOnChangeName} style={{ fontSize: '15px' }} defaultValue={this.state.editName}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <InputItem error={this.state.usernameHasError} placeholder="username" onChange={this.editOnChangeUsername} style={{ fontSize: '15px' }} defaultValue={this.state.editUserName}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <InputItem error={this.state.passwordhasError} placeholder="password" onChange={this.editOnChangePassword} style={{ fontSize: '15px' }} defaultValue={this.state.editPassword}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <InputItem error={this.state.hosthasError} placeholder="host" onChange={this.editOnChangeHost} style={{ fontSize: '15px' }} defaultValue={this.state.editHost}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <InputItem error={this.state.porthasError} placeholder="port" onChange={this.editOnChangePort} style={{ fontSize: '15px' }} defaultValue={this.state.editPort}></InputItem>
                                </List.Item>
                                <List.Item>
                                    <Button type="primary" size="small" onClick={this.handleEditModalBtn}>编辑</Button>
                                </List.Item>
                            </List>
                        </Modal>
                        <Modal
                            transparent={true}
                            visible={this.state.linkModal}
                            onClose={this.onCloseLink}
                            animationType="slide-up"
                            afterClose={() => { console.log('afterClose'); }}
                        >
                            <div className="console" id="terminal" ref={this.terminalDom}>

                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get('serverManage').get('isLoading'),
    serverlist: state.get('serverManage').get('serverlist'),
    name: state.get('serverManage').get('name'),
    username: state.get('serverManage').get('username'),
    host: state.get('serverManage').get('host'),
    port: state.get('serverManage').get('port'),
    password: state.get('serverManage').get('password')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetServerData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerDataAction())
    },
    handleAddServer: (options) => { // 处理添加服务器页面 添加服务器功能
        dispatch(actionCreator.handleAddServerAction(options))
    },
    handleGetEditData: (id) => { // 处理添加服务器页面, 编辑数据的回填
        dispatch(actionCreator.handleGetEditDataAction(id))
    },
    handleServerEdit: (options) => { // 处理添加服务器页面 编辑服务器功能
        dispatch(actionCreator.handleServerEditAction(options))
    },
    handleDelIp: (id) => { // 处理删除机器功能
        dispatch(actionCreator.handleDelIpAction(id))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(ServerManage)