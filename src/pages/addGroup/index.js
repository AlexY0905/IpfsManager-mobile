// 添加组页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./index.css"
import { actionCreator } from './store'
import { Button, Modal, List, NavBar, Icon, Checkbox, Accordion, InputItem, Toast } from 'antd-mobile';
import HomeSider from 'common/sider/index'
import { set } from "immutable";

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const prompt = Modal.prompt;
const alert = Modal.alert;

class AddGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            checkedData: [], // 保存所有选中的数据
            isAllChecked: false, // 全选按钮
            allDataChecked: [], // 添加了数据单独checked属性的数组
            addModal: false,
            editModal: false,
            addHasError: false,
            editHasError: false,
            addName: '',
            editName: '',
            editId: '',
            selectedDataList: [],
            groupSelectedDataList: []
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.onChange = this.onChange.bind(this)
        this.groupOnChange = this.groupOnChange.bind(this)
        this.handleEditShowModal = this.handleEditShowModal.bind(this)
        this.handleDistributionGroup = this.handleDistributionGroup.bind(this)
        this.handleDelBtn = this.handleDelBtn.bind(this)
        this.allCheckedOnChange = this.allCheckedOnChange.bind(this)
        this.onCloseEdit = this.onCloseEdit.bind(this)
        this.handleEditModalBtn = this.handleEditModalBtn.bind(this)
        this.editOnChangeName = this.editOnChangeName.bind(this)
        this.handleAddGroup = this.handleAddGroup.bind(this)
        this.addOnChangeName = this.addOnChangeName.bind(this)
        this.handleAddGroupBtn = this.handleAddGroupBtn.bind(this)
        this.onCloseAdd = this.onCloseAdd.bind(this)
    }
    componentDidMount() {
        // 调用发送方的数据 显示服务器列表
        this.props.handleGetServerHostData()
        // 调用发送方的数据 显示组名列表
        this.props.handleGetGroupList()
    }
    /*
    static getDerivedStateFromProps(props, state) {
        let arr = props.groupList.toJS()
        console.log(22222221111111111333333333, arr)

        return null
    }
     */
    onOpenChange(args) {
        console.log(':::::::--------', args);
        this.setState({ open: !this.state.open });
    }
    onChange(e, item) {
        console.log(':::::::::::---------', e);
        console.log(':::::::::::---------', item);
        let { selectedDataList } = this.state
        let arr = selectedDataList
        if (e.target.checked) {
            this.setState({
                selectedDataList: [...selectedDataList, item]
            }, () => {
                console.log(22222222222, this.state.selectedDataList);
                arr = this.state.selectedDataList
            })
        } else {
            arr.forEach((v, i) => {
                if (v.id == item.id) {
                    arr.splice(i, 1)
                    this.setState({
                        selectedDataList: arr
                    }, () => {
                        console.log(11111111111, this.state.selectedDataList);
                    })
                }
            })
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
    allCheckedOnChange(e, dataList) {
        console.log('::::::::::--------e', e)

    }
    handleAddGroup() {
        this.setState({
            addModal: true
        })
    }
    addOnChangeName(val) {
        this.setState({
            addName: val
        })
    }
    handleAddGroupBtn() {
        let { addName, selectedDataList } = this.state
        if (addName == '') {
            Toast.fail('输入框不能为空 !')
            return false
        } else {
            let options = {
                ipAddress: selectedDataList.length == 0 ? [] : selectedDataList,
                groupname: addName
            }
            console.log('options------------', options)
            // 调用发送方函数, 处理添加组名
            this.props.handleAddGroupName(options)
        }
    }
    onCloseAdd() {
        this.setState({
            addModal: false
        })
    }

    handleEditShowModal(e) {
        e.persist()
        console.log(':::::::--------', e)
        let id = e.target.dataset.id
        let name = e.target.dataset.name
        this.setState({
            editModal: true,
            editName: name,
            editId: id
        })
    }
    editOnChangeName(val) {
        console.log(111111, val)
        this.setState({
            editName: val
        })
    }
    handleEditModalBtn() {
        if (this.state.editName == '') {
            Toast.fail('输入框不能为空 !')
            return false
        } else {
            let { editId, editName } = this.state
            let options = {
                groupname: editName,
                id: editId
            }
            console.log(222222222, options)
            // 调用发送方函数, 处理编辑组名
            this.props.handleEditGroup(options)
        }
    }
    onCloseEdit() {
        this.setState({
            editModal: false
        })
    }

    handleDistributionGroup(e) {
        e.persist()
        console.log(':::::::--------', e)
        const { selectedDataList } = this.state
        let name = e.target.dataset.name
        console.log(':::::::----------', name)
        if (selectedDataList.length == 0) { // 没有选中ip机器
            Toast.fail('请选择上方需要的服务器ip')
            return false
        } else { // 选中了ip机器
            let options = {
                ipAddress: selectedDataList,
                groupname: name
            }
            console.log('分配组---------', options)
            // 调用发送方函数, 处理分配组
            this.props.handleDistributionGroupList(options)
        }
    }
    handleDelBtn(e) {
        e.persist()
        let { groupSelectedDataList } = this.state
        let id = e.target.dataset.id
        let name = e.target.dataset.name
        let options = {
            id: Number(id),
            ipAddress: []
        }
        if (name == 'default') {
            let delSelectedData = groupSelectedDataList.filter((item, index) => {
                return !item['children']
            }).map((item, index) => {
                return item.host
            })
            if (delSelectedData.length == 0) {
                Toast.fail('请勾选需要删除的ip !')
                return false
            }
            options.ipAddress = delSelectedData
        } else {
            if (groupSelectedDataList.length == 0) {
                options.ipAddress = []
            } else {
                groupSelectedDataList.forEach((item, index) => {
                    if (!item['children']) {
                        options.ipAddress.push(item.host)
                    } else {
                        options.ipAddress = []
                    }
                })
            }
        }
        const alertInstance = alert('删除', '确认删除吗 ?', [
            {
                text: '取消', onPress: () => {
                    this.setState({ groupSelectedDataList: [] })
                    location.reload()
                }
            },
            {
                text: '确认', onPress: () => {
                    // 调用发送方函数, 处理删除机器
                    console.log('删除options----------', options);
                    this.props.handleDelSelected(options)
                }
            }
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            alertInstance.close();
        }, 500000);
    }

    render() {
        const { serverhostlist, groupList } = this.props
        let groupDataList = []
        if (groupList.toJS().length > 0) {
            console.log(111111111, groupList.toJS());
            /*
            let arr = groupList.toJS()
            arr.map((item, index) => {
                if (item.Title.Servers == null) {
                    item.Title.Servers = []
                }
                if (item.Title.Servers.length != 0) {
                    item.Title.Servers.map((v, i) => {
                        v.checked = false
                    })
                }
            })
            console.log(2222222222, arr);
            if (arr.length == groupList.toJS().length) {
                this.setState({
                    allDataChecked: arr
                })
            }
            */
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

        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="组管理" />
                    <div className="content" style={{ paddingTop: '50px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button inline size="small" style={{ width: '80px', marginRight: '5px', marginBottom: '5px' }} type="primary" onClick={this.handleAddGroup}>创建组</Button>
                        </div>
                        <div className="ip_wrap">
                            <div>
                                <List renderHeader={() => '服务器IP地址'}>
                                    {
                                        serverhostlist.toJS().length > 0 && serverhostlist.toJS().map(item => (
                                            <CheckboxItem key={item.id} onChange={(e) => this.onChange(e, item)}>
                                                {item.host}
                                            </CheckboxItem>
                                        ))
                                    }
                                </List>
                            </div>
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


                        <Modal
                            transparent={true}
                            visible={this.state.addModal}
                            onClose={this.onCloseAdd}
                            animationType="slide-up"
                            afterClose={() => { console.log('afterClose'); }}
                        >
                            <List renderHeader={() => <div>创建组</div>} className="popup-list">
                                <List.Item>
                                    <InputItem error={this.state.addHasError} placeholder="输入组名" onChange={this.addOnChangeName} style={{ fontSize: '15px' }} />
                                </List.Item>
                                <List.Item>
                                    <Button type="primary" size="small" onClick={this.handleAddGroupBtn}>创建</Button>
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
                            <List renderHeader={() => <div>编辑组名</div>} className="popup-list">
                                <List.Item>
                                    <InputItem error={this.state.editHasError} placeholder="name" onChange={this.editOnChangeName} style={{ fontSize: '15px' }} defaultValue={this.state.editName} />
                                </List.Item>
                                <List.Item>
                                    <Button type="primary" size="small" onClick={this.handleEditModalBtn}>编辑</Button>
                                </List.Item>
                            </List>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

// 接收方
const mapStateToProps = (state) => ({
    isLoading: state.get('addGroup').get('isLoading'),
    serverhostlist: state.get('addGroup').get('serverhostlist'),
    groupList: state.get('addGroup').get('groupList')
})


// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetServerHostData: () => { // 处理获取服务器数据列表
        dispatch(actionCreator.handleGetServerHostDataAction())
    },
    handleGetGroupList: () => { // 处理获取组名数据列表
        dispatch(actionCreator.handleGetGroupListAction())
    },
    handleAddGroupName: (options) => { // 处理添加组名
        dispatch(actionCreator.handleAddGroupNameAction(options))
    },
    handleDistributionGroupList: (options) => { // 处理分配组数据
        dispatch(actionCreator.handleDistributionGroupListAction(options))
    },
    handleDelSelected: (options) => { // 处理删除选中的组
        dispatch(actionCreator.handleDelSelectedAction(options))
    },
    handleEditGroup: (options) => { // 处理编辑组名
        dispatch(actionCreator.handleEditGroupAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup)