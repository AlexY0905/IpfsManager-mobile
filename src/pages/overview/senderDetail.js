// lotusMiner页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { List, SegmentedControl, Pagination, Icon } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'
import { Tooltip, Chart, Geom, Axis, Legend } from 'bizcharts';
import { Line } from '@ant-design/charts';

class SenderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false, // 不能删
            newListSelect: 0,
            newListType: '消息列表',
            newListSelectType: '',
            currentPage: 1,
            accountDataSelect: 0
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.onNewListChange = this.onNewListChange.bind(this)
        this.onNewListValueChange = this.onNewListValueChange.bind(this)
        this.newListSelectOnChange = this.newListSelectOnChange.bind(this)
        this.newListPaginationChange = this.newListPaginationChange.bind(this)
        this.handleGoPage = this.handleGoPage.bind(this)
        this.onAccountDataChange = this.onAccountDataChange.bind(this)
        this.onAccountValueChange = this.onAccountValueChange.bind(this)
    }
    onOpenChange(args) {
        this.setState({ open: !this.state.open });
    }
    componentDidMount() {
        console.log('参数----------', this.props.location.state.parameter);
        // 调用发送方函数, 处理账户概览数据
        let options = {
            name: 'minersummaryinfo',
            address: this.props.location.state.parameter
        }
        this.props.handleAccountDetailData(options)
        // 调用发送方函数, 处理有效算力折线图数据
        let powerOptions = {
            name: 'frompowerchanges',
            address: this.props.location.state.parameter,
            time: ''
        }
        this.props.handlePowerEchartsData(powerOptions)
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minermessage', page: 1, address: this.props.location.state.parameter}
        this.props.handleNewList(newListOptions)
        setInterval(() => {
            this.props.handlePowerEchartsData(powerOptions)
            this.props.handleNewList(newListOptions)
        }, 7800000)
    }
    // 消息列表筛选框索引选中
    onNewListChange(e) {
        this.setState({
            newListSelect: e.nativeEvent.selectedSegmentIndex
        })
    }
    // 消息列表筛选单选框变化回调
    onNewListValueChange(value) {
        console.log(value);
        this.setState({newListType: value, currentPage: 1})
        let options = {
            name: '',
            page: 1,
            address: this.props.location.state.parameter
        }
        if (value == '消息列表') {
            options.name = 'minermessage'
        } else if (value == '区块列表') {
            options.name = 'minerblocks'
        } else if (value == '转账列表') {
            options.name = 'minertransfors'
        }
        // 调用发送函数, 处理消息, 区块, 转账列表数据
        this.props.handleNewList(options)
    }
    // 消息列表下拉框变化回调
    newListSelectOnChange (e) {
        console.log(1231231, e.target.value)
        this.setState({newListSelectType: e.target.value, currentPage: 1})
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minermessage', page: 1, method: e.target.value, address: this.props.location.state.parameter}
        this.props.handleNewList(newListOptions)
    }
    // 消息列表分页器变化回调
    newListPaginationChange (val) {
        this.setState({currentPage: val})
        let options = {
            name: '',
            page: val,
            address: this.props.location.state.parameter
        }
        if (this.state.newListType == '消息列表') {
            options.name = 'minermessage'
            options.method = this.state.newListSelectType
        } else if (this.state.newListType == '转账列表') {
            options.name = 'minertransfors'
        }
        // 调用发送方函数, 处理消息列表数据
        this.props.handleNewList(options)
    }
    // 跳转页面
    handleGoPage (val, type) {
        if (val == 'N/A') return
        if (type == 'messageIdDetailPage') {
            this.props.history.push({ pathname: "/overview/messageIdDetail", state: { parameter: val } })
        } else if (type == 'heightDetailPage') {
            this.props.history.push({ pathname: "/overview/heightDetail", state: { parameter: val } })
        } else if (type == 'senderDetailPage') {
            this.props.history.push({ pathname: "/overview/senderDetail", state: { parameter: val } })
        } else if (type == 'blockDetailPage') {
            this.props.history.push({ pathname: "/overview/blockDetail", state: { parameter: val } })
        } else if (type == 'nodeIdPage') {
            this.props.history.push({ pathname: "/overview/nodeIdDetail", state: { parameter: val } })
        }
    }
    // 账户折线图时间选择框索引变化
    onAccountDataChange(e) {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({
            accountDataSelect: e.nativeEvent.selectedSegmentIndex
        })
    }
    // 账户折线图时间选择框点击变化
    onAccountValueChange(value) {
        let options = {
            name: 'frompowerchanges',
            address: this.props.location.state.parameter,
            time: ''
        }
        if (value == '24时') {
            options.time = '24'
        } else if (value == '7天') {
            options.time = '7'
        } else if (value == '30天') {
            options.time = '30'
        } else if (value == '1年') {
            options.time = '1'
        }
        // 调用发送方函数, 处理各个时间段的数据
        this.props.handlePowerEchartsData(options)
    }



    render() {
        let { powerEchartsOneData, newListData, newListSelectData, totalCount, accountDetailData, powerEchartsCompany } = this.props
        // ---------------------------------------------- 有效算力折线图 --------------------------------------------

        let echartsData = []
        let lineConfig = ''
        if (powerEchartsOneData.toJS().length > 0 && powerEchartsCompany != '') {
            /*
            echartsData = powerEchartsOneData.toJS();
            const cols = {
                time: {
                    nice: true,
                    alias: "时间"
                },
                miner_power_quality: {
                    nice: true,
                    alias: "有效算力"
                }
            };
            */
            lineConfig = {
                data: powerEchartsOneData.toJS(),
                xField: 'timestamp',
                yField: 'balance',
                yAxis: {
                    label: {
                        formatter: function formatter(v) {
                            return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                                return ''.concat(s, ',');
                            }) + ' ' + powerEchartsCompany;
                        }
                    }
                },
                tooltip: {
                    formatter: function formatter(datum) {
                        return {
                            name: '总余额',
                            value: ''.concat(datum.balance + ' ', powerEchartsCompany),
                        }
                    }
                },
                height: 220
            }
        }


        // ---------------------------------------------- 有效算力折线图 --------------------------------------------
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------
        let tableData = []
        if (newListData.toJS().length > 0) {
            if (this.state.newListType == '' || this.state.newListType == '消息列表') {
                tableData = newListData.toJS().map((item, index) => (
                    <div className="newList_item">
                        <div><span>消息ID: </span><span onClick={ () => this.handleGoPage(item.Cid, 'messageIdDetailPage')}>{item.Cid}</span></div>
                        <div><span>区块高度: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.Height, 'heightDetailPage')}>{item.Height}</span></div>
                        <div><span>时间: </span><span>{item.TimeCreate}</span></div>
                        <div><span>发送方: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.From, 'senderDetailPage')}>{item.From}</span></div>
                        <div><span>接收方: </span><span style={{color: '#1a4fc9'}} onClick={() => { this.props.history.push({ pathname: "/overview" }) }}>{item.To}</span></div>
                        <div><span>方法: </span><span>{item.Method}</span></div>
                        <div><span>金额: </span><span>{item.Balance}</span></div>
                        <div><span>状态: </span><span>{item.Status}</span></div>
                    </div>
                ))
            } else if (this.state.newListType == '转账列表') {
                tableData = newListData.toJS().map((item, index) => (
                    <div className="newList_item">
                        <div><span>时间: </span><span>{item.TimeCreate}</span></div>
                        <div><span>消息ID: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.MessageId, 'messageIdDetailPage')}>{item.MessageId}</span></div>
                        <div><span>发送方: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.From, 'senderDetailPage')}>{item.From}</span></div>
                        <div><span>接收方: </span><span style={{color: '#1a4fc9'}} onClick={() => { this.props.history.push({ pathname: "/overview" }) }}>{item.To}</span></div>
                        <div><span>净收入: </span><span>{item.Balance}</span></div>
                        <div><span>类型: </span><span>{item.TransferType}</span></div>
                    </div>
                ))
            }
        }
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------

        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="矿工概览" isBack={true} />
                    <div className="content" style={{ paddingTop: '45px', textAlign: 'left' }}>
                        <div className="senderDetail_wrap">
                            <div className="senderDetail_box">
                                <div className="content_top">
                                    <span>账户概览</span>
                                </div>
                                {
                                    accountDetailData != '' && (
                                        <div className="content_bottom">
                                            <div><span>地址</span><span>{accountDetailData.Address}</span></div>
                                            <div><span>ID</span><span>{accountDetailData.ID}</span></div>
                                            <div><span>类型</span><span>{accountDetailData.AccountType}</span></div>
                                            <div><span>余额</span><span>{accountDetailData.Balance}</span></div>
                                            <div><span>消息数</span><span>{accountDetailData.MessageCount}</span></div>
                                            <div><span>创建时间</span><span>{accountDetailData.TimeCreate}</span></div>
                                            <div><span>最新交易</span><span>{accountDetailData.TimeLastedTransaction}</span></div>
                                            <div><span>名下矿工</span><span style={{color: '#1a4fc9'}}>{accountDetailData.Miners.length > 0 && accountDetailData.Miners.map((item, index) => (<span onClick={() => { this.props.history.push({ pathname: "/overview" }) }}>{item}</span>))}</span></div>
                                            <div><span>实际工作矿工</span><span style={{color: '#1a4fc9'}}>{accountDetailData.Workers.length > 0 && accountDetailData.Workers.map((item, index) => (<span onClick={() => { this.props.history.push({ pathname: "/overview" }) }}>{item}</span>))}</span></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="power_echarts_wrap">
                            <div className="content_top" style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                                <SegmentedControl
                                    onChange={this.onAccountDataChange}
                                    onValueChange={this.onAccountValueChange}
                                    values={['24时', '7天', '30天', '1年']}
                                    selectedIndex={this.state.accountDataSelect}
                                    style={{width: '200px'}}
                                />
                            </div>
                            {
                                powerEchartsOneData.toJS().length > 0 && powerEchartsCompany != '' && (
                                    /*
                                    <div className="power_echarts_box">
                                        <Chart height={300} data={echartsData} scale={cols} forceFit padding={[20, 20, 50, 70]}>
                                            <Axis
                                                name="timestamp"
                                                line={{
                                                    stroke: "#E6E6E6"
                                                }}
                                            />
                                            <Axis
                                                name="balance"
                                                label={{
                                                    formatter: val => `${val} ${powerEchartsCompany}`
                                                }}
                                            />
                                            <Tooltip />
                                            <Legend />
                                            <Geom
                                                type="line"
                                                position="timestamp*balance"
                                                size={1}
                                                color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                                shape="smooth"
                                                style={{
                                                    shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                                    shadowBlur: 60,
                                                    shadowOffsetY: 6
                                                }}
                                                tooltip={['timestamp*balance', (timestamp, balance) => {
                                                    return {
                                                        name: '有效算力',
                                                        title: timestamp,
                                                        value: balance + ' ' + powerEchartsCompany
                                                    };
                                                }]}
                                            />
                                        </Chart>
                                    </div>
                                    */
                                    <Line {...lineConfig} />
                                )
                            }
                        </div>
                        <div className="newList_wrap">
                            <div className="newList_box">
                                <div className="content_top">
                                    <SegmentedControl
                                        onChange={this.onNewListChange}
                                        onValueChange={this.onNewListValueChange}
                                        values={['消息列表', '转账列表']}
                                        selectedIndex={this.state.newListSelect}
                                        style={{width: '200px'}}
                                    />
                                </div>
                                <div className="content_center">
                                    <div><span>共 </span><span>{totalCount != '' && totalCount}</span> 条消息</div>
                                    {
                                        newListSelectData.toJS().length > 0 && (
                                            <div className="option">
                                                <select onChange={this.newListSelectOnChange}>
                                                    <option value='全部'>全部</option>
                                                    {
                                                        newListSelectData.toJS().map((item, index) => (
                                                            <option value={item}>{item}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="content_bottom">
                                    {
                                        tableData.length > 0 && tableData
                                    }
                                </div>
                                <div className="newListPagination_wrap">
                                    <Pagination
                                        total={Math.ceil(totalCount / 20)}
                                        className="custom-pagination-with-icon"
                                        current={this.state.currentPage}
                                        locale={{
                                            prevText: (<span className="arrow-align"><Icon type="left" />上一页</span>),
                                            nextText: (<span className="arrow-align">下一页<Icon type="right" /></span>),
                                        }}
                                        onChange={this.newListPaginationChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('overview').get('isLoading'),
    powerEchartsOneData: state.get('overview').get('powerEchartsOneData'),
    newListData: state.get('overview').get('newListData'),
    newListSelectData: state.get('overview').get('newListSelectData'),
    totalCount: state.get('overview').get('totalCount'),
    accountDetailData: state.get('overview').get('accountDetailData'),
    powerEchartsCompany: state.get('overview').get('powerEchartsCompany')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleAccountDetailData: (options) => {
        dispatch(actionCreator.handleAccountDetailDataAction(options))
    },
    handleOverviewEchartsData: (options) => {
        dispatch(actionCreator.handleOverviewEchartsDataAction(options))
    },
    handlePowerEchartsData: (options) => {
        dispatch(actionCreator.handlePowerEchartsDataAction(options))
    },
    handleNewList: (options) => {
        dispatch(actionCreator.handleNewListAction(options))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(SenderDetail)
