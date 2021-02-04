// lotusMiner页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { List, SegmentedControl, Pagination, Icon } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'
import { Pie, Line, DualAxes } from '@ant-design/charts';
import { Tooltip, Chart, Geom, Axis, Legend } from 'bizcharts';
const Item = List.Item;


let overviewIsOne = true
let timer = null
class Overview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false, // 不能删
            avialiablePower: '',
            blocksMined: '',
            powerRank: '',
            powerRate: '',
            realityPower: '',
            storageSize: '',
            totalRewards: '',
            storage: {
                active: '',
                faulty: '',
                live: '',
                recovering: ''
            },
            miningCountsSelect: 0,
            newListSelect: 0,
            newListType: '消息列表',
            newListSelectType: '',
            currentPage: 1
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.onMiNingSelectedChange = this.onMiNingSelectedChange.bind(this)
        this.onMiNingSelectedValueChange = this.onMiNingSelectedValueChange.bind(this)
        this.onNewListChange = this.onNewListChange.bind(this)
        this.onNewListValueChange = this.onNewListValueChange.bind(this)
        this.newListSelectOnChange = this.newListSelectOnChange.bind(this)
        this.newListPaginationChange = this.newListPaginationChange.bind(this)
        this.handleGoPage = this.handleGoPage.bind(this)
    }
    onOpenChange(args) {
        this.setState({ open: !this.state.open });
    }
    componentDidMount() {
        // 调用发送方函数, 处理矿工概览饼形图数据
        let options = { name: 'minerdetail' }
        this.props.handleOverviewEchartsData(options)
        // 调用发送方函数, 处理挖矿数据
        let miningOptions = {name: 'miningstatistics', time: ''}
        this.props.handleMiningCounts(miningOptions)
        // 调用发送方函数, 处理账户折线图数据
        let accountLineOptions = {name: 'accountchanges'}
        this.props.handleAccountLine(accountLineOptions)
        // 调用发送方函数, 处理有效算力折线图数据
        let powerLineOptions = {name: 'powerchanges'}
        this.props.handleEchartsData(powerLineOptions)
        // 调用发送方函数, 处理账户概览数据
        let accountOptions = {name: 'accoutSummary'}
        this.props.handleAccountData(accountOptions)
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minermessage', page: 1}
        this.props.handleNewList(newListOptions)
        setInterval(() => {
            this.props.handleOverviewEchartsData(options)
            this.props.handleMiningCounts(miningOptions)
            this.props.handleEchartsData()
            this.props.handleAccountData(accountOptions)
            this.props.handleNewList(newListOptions)
        }, 7800000)
    }
    // 挖矿统计筛选单选框选中索引
    onMiNingSelectedChange(e) {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({
            miningCountsSelect: e.nativeEvent.selectedSegmentIndex
        })
    }
    // 挖矿统计筛选单选框变化回调
    onMiNingSelectedValueChange(value) {
        let options = {
            name: 'miningstatistics',
            time: value
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
        this.props.handleMiningCounts(options)
        console.log(value);
    }
    // 消息列表筛选框索引选中
    onNewListChange(e) {
        this.setState({
            newListSelect: e.nativeEvent.selectedSegmentIndex
        })
    }
    // 消息列表筛选单选框变化回调
    onNewListValueChange(value) {
        this.setState({newListType: value, currentPage: 1})
        let options = {
            name: '',
            page: 1
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
        this.setState({newListSelectType: e.target.value, currentPage: 1})
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minermessage', page: 1, method: e.target.value}
        this.props.handleNewList(newListOptions)
    }
    // 消息列表分页器变化回调
    newListPaginationChange (val) {
        this.setState({currentPage: val})
        let options = {
            name: '',
            page: val
        }
        if (this.state.newListType == '消息列表') {
            options.name = 'minermessage'
            options.method = this.state.newListSelectType
        } else if (this.state.newListType == '区块列表') {
            options.name = 'minerblocks'
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


    render() {
        let {
            overviewEchartsDataList,
            accountBalance,
            overviewPowerData,
            miningCountsData,
            accountLineData,
            accountLineCompany,
            echartsDataList,
            powerLineCompany,
            accountOverviewData,
            newListData,
            newListSelectData,
            totalCount
        } = this.props
        // ---------------------------------------------- 矿工概览数据 --------------------------------------------
        // 饼形图数据开始
        let overviewEchartsData = []
        let overviewDataHtml = []
        if (overviewEchartsDataList.toJS().length > 0) {
            overviewEchartsData = overviewEchartsDataList.toJS()
            overviewDataHtml = overviewEchartsData.map((item, index) => {
                if (item.type == '可用余额') {
                    return (<p>可用余额: {item.value.toFixed(2)} FIL</p>)
                } else if (item.type == '扇区抵押') {
                    return (<p>扇区抵押: {item.value.toFixed(2)} FIL</p>)
                } else if (item.type == '挖矿锁仓') {
                    return (<p>挖矿锁仓: {item.value.toFixed(2)} FIL</p>)
                }
            })
        }
        let config = {
            appendPadding: 10,
            data: overviewEchartsData,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.5,
            label: {
                type: 'inner',
                offset: '-50%',
                // content: '{value}',
                content: function () {
                    return ''
                },
                style: {
                    textBaseline: 'top',
                    textAlign: 'center',
                    fontSize: 14
                }
            },
            style: {
                width: '100%',
                height: '100%'
            },
            legend: false,
            interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
            statistic: {
                title: false,
                content: {
                    formatter: function formatter() {
                        return '';
                    }
                }
            }
        }
        // 饼形图数据结束
        // 有效算力数据开始
        if (overviewPowerData != '' && overviewIsOne) {
            this.setState({
                avialiablePower: overviewPowerData.AvialiablePower,
                blocksMined: overviewPowerData.BlocksMined,
                powerRank: overviewPowerData.PowerRank,
                powerRate: overviewPowerData.PowerRate,
                realityPower: overviewPowerData.RealityPower,
                storageSize: overviewPowerData.StorageSize,
                totalRewards: overviewPowerData.TotalRewards,
                storage: {
                    active: overviewPowerData.Storage.Active,
                    faulty: overviewPowerData.Storage.Faulty,
                    live: overviewPowerData.Storage.Live,
                    recovering: overviewPowerData.Storage.Recovering
                }
            })
            overviewIsOne = false
        }
        // 有效算力数据结束
        // ---------------------------------------------- 矿工概览数据 --------------------------------------------
        // ---------------------------------------------- 账户折线图 --------------------------------------------
        let lineConfig = {}
        if (accountLineData.toJS().length > 0 && accountLineCompany != '') {
            let COLOR_PLATE_10 = [
                '#5B8FF9',
                '#5AD8A6',
                '#5D7092',
                '#F6BD16',
                '#E8684A',
                '#6DC8EC',
                '#9270CA',
                '#FF9D4D',
                '#269A99',
                '#FF99C3',
            ]
            lineConfig = {
                data: accountLineData.toJS(),
                xField: 'times',
                yField: 'value',
                seriesField: 'name',
                yAxis: {
                    label: {
                        formatter: function formatter(v) {
                            return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                                return ''.concat(s, ',');
                            }) + ' ' + accountLineCompany;
                        }
                    }
                },
                color: COLOR_PLATE_10,
                point: {
                    style: function style(_ref2) {
                        let times = _ref2.times;
                        return { r: Number(times) % 4 ? 0 : 3 };
                    }
                },
                tooltip: {
                    formatter: function formatter(datum) {
                        return {
                            name: datum.name,
                            value: ''.concat(datum.value + ' ', accountLineCompany),
                        }
                    }
                },
                height: 220
            }
        }
        // ---------------------------------------------- 账户折线图 --------------------------------------------

        // ---------------------------------------------- 有效算力折线图 --------------------------------------------
        /*
        let echartsData = []
        if (echartsDataList.toJS().length > 0) {
            echartsData = echartsDataList.toJS();
        }
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
        let powerConfig = ''
        if (echartsDataList.toJS().length > 0 && powerLineCompany != '') {
            // console.log('::::::+++++++12321', powerLineCompany);
            powerConfig = {
                data: [echartsDataList.toJS(), echartsDataList.toJS()],
                xField: 'times',
                yField: ['power_delta', 'effective_power'],
                geometryOptions: [
                    { geometry: 'column' },
                    {
                        geometry: 'line',
                        lineStyle: { lineWidth: 2 }
                    }
                ],
                legend: {
                    itemName: {
                        formatter: function formatter(text, item) {
                            return item.value === 'power_delta' ? '有效算力增量' : '有效算力';
                        }
                    }
                },
                showTitle: true,
                title: '账户标题',
                height: 220,
                tooltip: {
                    formatter: function formatter(datum) {
                        if (datum.effective_power || datum.effective_power == 0) { // 有效算力
                            return {
                                name: '有效算力',
                                value: datum.effective_power + powerLineCompany
                            }
                        } else if (datum.power_delta || datum.power_delta == 0) { // 有效算力增量
                            return {
                                name: '有效算力增量',
                                value: datum.power_delta + powerLineCompany
                            }
                        }
                    }
                }
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
                        <div><span>接收方: </span><span style={{color: '#1a4fc9'}}>{item.To}</span></div>
                        <div><span>方法: </span><span>{item.Method}</span></div>
                        <div><span>金额: </span><span>{item.Balance}</span></div>
                        <div><span>状态: </span><span>{item.Status}</span></div>
                    </div>
                ))
            } else if (this.state.newListType == '区块列表') {
                tableData = newListData.toJS().map((item, index) => (
                    <div className="newList_item">
                        <div><span>区块高度: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.Height, 'heightDetailPage')}>{item.Height}</span></div>
                        <div><span>区块ID: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.Cid, 'blockDetailPage')}>{item.Cid}</span></div>
                        <div><span>奖励: </span><span>{item.Reward}</span></div>
                        <div><span>时间: </span><span>{item.TimeCreate}</span></div>
                        <div><span>消息数: </span><span>{item.MessageAccounts}</span></div>
                        <div><span>区块大小: </span><span>{item.BlockSize}</span></div>
                    </div>
                ))
            } else if (this.state.newListType == '转账列表') {
                tableData = newListData.toJS().map((item, index) => (
                    <div className="newList_item">
                        <div><span>时间: </span><span>{item.TimeCreate}</span></div>
                        <div><span>消息ID: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.MessageId, 'messageIdDetailPage')}>{item.MessageId}</span></div>
                        <div><span>发送方: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.From, 'senderDetailPage')}>{item.From}</span></div>
                        <div><span>接收方: </span><span style={{color: '#1a4fc9'}}>{item.To}</span></div>
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
                    <HomeSider open={this.state.open} activeTxt="矿工概览" />
                    <div className="content" style={{ paddingTop: '45px' }}>
                        <div className="page_title_wrap">
                            <p className="title_txt">矿工概览</p>
                            <p>账户 <span>f015734</span></p>
                        </div>
                        <div className="overview_wrap">
                            <div className="overview_box">
                                <div className="box_left">
                                    <Pie {...config} />
                                </div>
                                <div className="box_right">
                                    {
                                        accountBalance && (
                                            <div className="box_top">
                                                <div>账户余额</div>
                                                <h3>{ accountBalance }</h3>
                                            </div>
                                        )
                                    }
                                    <div className="box_bottom">
                                        {
                                            overviewDataHtml.length > 0 && overviewDataHtml
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="powerData_wrap">
                            <div className="powerData_box">
                                <div className="content_top">
                                    <div className="top">
                                        <span>有效算力</span>
                                    </div>
                                    <div className="bottom">
                                        <div><span>{this.state.avialiablePower != '' && this.state.avialiablePower}</span></div>
                                        <div style={{flex: '2'}}><span>占比: </span><span>{this.state.powerRate != '' && this.state.powerRate}</span></div>
                                        <div><span>排名: </span><span>{this.state.powerRank != '' && this.state.powerRank}</span></div>
                                    </div>
                                </div>
                                <div className="content_center">
                                    <div><span>原值算力: </span><span>{this.state.realityPower != '' && this.state.realityPower}</span></div>
                                    <div><span>累计出块份数: </span><span>{this.state.blocksMined != '' && this.state.blocksMined}</span></div>
                                    <div><span>累计出块奖励: </span><span>{this.state.totalRewards != '' && this.state.totalRewards}</span></div>
                                    <div><span>扇区大小: </span><span>{this.state.storageSize != '' && this.state.storageSize}</span></div>
                                </div>
                                <div className="content_bottom">
                                    <div><span>扇区状态: </span></div>
                                    <div className="statusMsg">
                                        <span>17,889 全部,</span>
                                        <span style={{color: '#38a169'}}>{this.state.storage.active != '' && this.state.storage.active} 有效, </span>
                                        <span style={{color: '#c53030'}}>{this.state.storage.faulty != '' ? this.state.storage.faulty : 0} 错误, </span>
                                        <span style={{color: '#ecc94b'}}>{this.state.storage.recovering != '' ? this.state.storage.recovering : 0} 恢复中 </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="miningCount_wrap">
                            <div className="miningCount_box">
                                <div className="content_top">
                                    <div style={{flex: '1'}}>挖矿统计</div>
                                    <div className="select_wrap">
                                        <SegmentedControl
                                            onChange={this.onMiNingSelectedChange}
                                            onValueChange={this.onMiNingSelectedValueChange}
                                            values={['24时', '7天', '30天', '1年']}
                                            selectedIndex={this.state.miningCountsSelect}
                                        />
                                    </div>
                                </div>
                                {
                                    miningCountsData != '' && (
                                        <div className="content_bottom">
                                            <div><span>算力增量: </span><span>{miningCountsData.PowerIncrease}</span></div>
                                            <div><span>算力增速: </span><span>{miningCountsData.PowerIncreaseRate}</span></div>
                                            <div><span>矿机当量: </span><span>{miningCountsData.EquivalentMiners}</span></div>
                                            <div><span>出块数量: </span><span>{miningCountsData.BlocksMined}</span></div>
                                            { /* <div><span>出块奖励: </span><span>173.6154 FIL</span></div> */ }
                                            <div><span>出块奖励占比: </span><span>{miningCountsData.TotalRewards}</span></div>
                                            <div><span>出块份数: </span><span>{miningCountsData.WeightedBlocksMined}</span></div>
                                            <div><span>挖矿效率: </span><span>{miningCountsData.RewardPer} FIL/TiB</span></div>
                                            <div><span>抽查成本: </span><span>{miningCountsData.WindowedPoStFeePer}</span></div>
                                            <div><span>幸运值: </span><span>{miningCountsData.LunckValue}</span></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="power_echarts_wrap">
                            <div className="power_echarts_box" style={{boxSizing: 'border-box', padding: '5px'}}>
                                {
                                    accountLineData.toJS().length > 0 && (
                                        <Line {...lineConfig} />
                                    )
                                }
                            </div>
                        </div>
                        <div className="power_echarts_wrap">
                            <div className="power_echarts_box" style={{boxSizing: 'border-box', padding: '5px'}}>
                                {
                                    /*
                                    <Chart height={300} data={echartsData} scale={cols} forceFit padding={[20, 20, 50, 70]}>
                                        <Axis
                                            name="time"
                                            line={{
                                                stroke: "#E6E6E6"
                                            }}
                                        />
                                        <Axis
                                            name="miner_power_quality"
                                            label={{
                                                formatter: val => `${val} TiB`
                                            }}
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Geom
                                            type="line"
                                            position="time*miner_power_quality"
                                            size={1}
                                            color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                            shape="smooth"
                                            style={{
                                                shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                                shadowBlur: 60,
                                                shadowOffsetY: 6
                                            }}
                                            tooltip={['time*miner_power_quality', (time, miner_power_quality) => {
                                                return {
                                                    name: '有效算力',
                                                    title: time,
                                                    value: miner_power_quality + ' TiB'
                                                };
                                            }]}
                                        />
                                    </Chart>
                                    */
                                }
                                {
                                    powerConfig != '' && (
                                        <div>
                                            <h3>单位: {powerLineCompany}</h3>
                                            <DualAxes {...powerConfig} />
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                        <div className="accountData_wrap">
                            <div className="accountData_box">
                                <div className="content_top">
                                    <span>账户概览</span>
                                </div>
                                {
                                    accountOverviewData != '' && (
                                        <div className="content_bottom">
                                            <div><span>地址</span><span>{accountOverviewData.Address}</span></div>
                                            <div><span>消息数</span><span>{accountOverviewData.MessageCount}</span></div>
                                            <div><span>类型</span><span>{accountOverviewData.AccountType}</span></div>
                                            <div><span>创建时间</span><span>{accountOverviewData.TimeCreate}</span></div>
                                            <div><span>节点ID</span><span style={{color: '#1a4fc9'}} onClick={() => this.handleGoPage(accountOverviewData.NodeID, 'nodeIdPage')}>{accountOverviewData.NodeID}</span></div>
                                            <div><span>Owner</span><span style={{color: '#1a4fc9'}} onClick={() => this.handleGoPage(accountOverviewData.Owner, 'senderDetailPage')}>{accountOverviewData.Owner}</span></div>
                                            <div><span>Worker</span><span style={{color: '#1a4fc9'}} onClick={() => this.handleGoPage(accountOverviewData.Worker, 'senderDetailPage')}>{accountOverviewData.Worker}</span></div>
                                            {/*<div><span>地区（公开IP）</span><span>{accountOverviewData.Location}</span></div>*/}
                                            <div><span>地区(公开IP):</span><span><span><img style={{width: '20px', verticalAlign: '-3px', marginRight: '2px'}} src={accountOverviewData.Location.Flag} /></span><span>{accountOverviewData.Location.ContinentName}-</span><span>{accountOverviewData.Location.CountryName}-</span><span>{accountOverviewData.Location.RegionName}-</span><span>{accountOverviewData.Location.City}</span><span>{accountOverviewData.Location.Ip}</span></span></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="newList_wrap">
                            <div className="newList_box">
                                <div className="content_top">
                                    <SegmentedControl
                                        onChange={this.onNewListChange}
                                        onValueChange={this.onNewListValueChange}
                                        values={['消息列表', '区块列表', '转账列表']}
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
    overviewEchartsDataList: state.get('overview').get('overviewEchartsDataList'),
    accountBalance: state.get('overview').get('accountBalance'),
    overviewPowerData: state.get('overview').get('overviewPowerData'),
    miningCountsData: state.get('overview').get('miningCountsData'),
    accountLineData: state.get('overview').get('accountLineData'),
    accountLineCompany: state.get('overview').get('accountLineCompany'),
    echartsDataList: state.get('overview').get('echartsDataList'),
    powerLineCompany: state.get('overview').get('powerLineCompany'),
    accountOverviewData: state.get('overview').get('accountOverviewData'),
    newListData: state.get('overview').get('newListData'),
    newListSelectData: state.get('overview').get('newListSelectData'),
    totalCount: state.get('overview').get('totalCount')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleOverviewEchartsData: (options) => {
        dispatch(actionCreator.handleOverviewEchartsDataAction(options))
    },
    handleMiningCounts: (options) => {
        dispatch(actionCreator.handleMiningCountsAction(options))
    },
    handleEchartsData: (options) => {
        dispatch(actionCreator.handleEchartsDataAction(options))
    },
    handleAccountData: (options) => {
        dispatch(actionCreator.handleAccountDataAction(options))
    },
    handleNewList: (options) => {
        dispatch(actionCreator.handleNewListAction(options))
    },
    handleAccountLine: (options) => {
        dispatch(actionCreator.handleAccountLineAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
