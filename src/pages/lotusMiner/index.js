// lotusMiner页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { Modal, NavBar, Icon, SearchBar, Tabs, List, Toast, Button, Accordion } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'
import { Tooltip, Chart, Geom, Axis, Legend } from 'bizcharts';


const Item = List.Item;

class LotusHelp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            data: '',
            visible: false,
            modalType: '',
            modalOrder: '',
            isShowSearch: false,
            isSearchShow: false
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.handleServerBtn = this.handleServerBtn.bind(this)
        this.handleSearchBtn = this.handleSearchBtn.bind(this)
        this.handleTabsOnChange = this.handleTabsOnChange.bind(this)

    }
    componentDidMount() {
        // 在生命周期调用发送方的数据

    }
    onOpenChange(args) {
        console.log(':::::::--------', args);
        this.setState({ open: !this.state.open });
    }
    handleServerBtn(type) {//所有六个按钮的点击事件
        let options = {
            name: ''
        }
        switch (type) {
            case 'list':
                options.name = 'storagedealslist'
                this.setState({ isShowSearch: false })
                break
            case 'get-ask':
                options.name = 'lotusminerstoragedealsgetask'
                this.setState({ isShowSearch: false })
                break
            case 'list-cids':
                options.name = 'pieceslist-cids'
                this.setState({ isShowSearch: false })
                break
            case 'cid-info':
                options.name = 'piecescid-info'
                this.setState({ isShowSearch: false })
                break
            case 'sectorslist':
                options.name = 'sectorssectorslist'
                this.setState({ isShowSearch: false })
                break
            case 'status':
                options.name = 'sectorsstatus'
                this.setState({ isShowSearch: false })
                break
        }
        //调用发送方函数, 处理lotus命令
        this.props.handleLotusOrders(options)
        setInterval(() => {//十一分钟刷新一次数据
            this.props.handleLotusOrders(options)
        }, 660000)

        this.setState({
            modalType: type
        })
    }


    handleSearchBtn(val) {//处理搜索
        const { modalOrder } = this.state
        if (val == '') {
            Toast.fail('搜索框不能为空 !')
            return false
        }
        let options = {
            name: modalOrder,
            info: val
        }

        console.log('options---------', options)
        return false
        //调用发送方函数, 处理搜索
        this.props.handleSearch(options)
    }

    handleTabsOnChange(item) {
        console.log('============', item)
    }



    render() {
        let { name, type, lotusOrderList } = this.props
        let { modalType } = this.state
        const tabs = [//选项卡切换
            { title: 'storage-deals' },
            // { title: 'pieces' },
            // { title: 'sectors' }
        ];
        let renderContent = tabs.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                {
                    item.title == 'storage-deals' && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {/* <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('list')}>list</Button> */}
                            <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('get-ask')}>get-ask</Button>
                        </div>
                    )
                    ||
                    item.title == 'pieces' && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('list-cids')}>list-cids</Button>
                            <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('cid-info')}>cid-info</Button>
                        </div>
                    )
                    ||
                    item.title == 'sectors' && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('sectorslist')}>sectorslist</Button>
                            <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('status')}>status</Button>
                        </div>
                    )
                }
            </div>
        ))
        let listHtml = null
        if (lotusOrderList.toJS().length > 0) {
            if (name == 'storagedealslist') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`ProposalCid: ${item.proposalCid}`}>
                            <List className="my-list">
                                <List.Item><span>ProposalCid : </span><span>{item.proposalCid}</span></List.Item>
                                <List.Item><span>DealId : </span><span>{item.dealId}</span></List.Item>
                                <List.Item><span>State : </span><span>{item.State}</span></List.Item>
                                <List.Item><span>Client : </span><span>{item.client}</span></List.Item>
                                <List.Item><span>Size : </span><span>{item.size}</span></List.Item>
                                <List.Item><span>Price : </span><span>{item.price}</span></List.Item>
                                <List.Item><span>Duration : </span><span>{item.duration}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusminerstoragedealsgetask') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`Expiry: ${item.expiry}`}>
                            <List className="my-list">
                                <List.Item><span>Expiry : </span><span>{item.expiry}</span></List.Item>
                                <List.Item><span>MaxpieceSize : </span><span>{item.max_piece_size}</span></List.Item>
                                <List.Item><span>MinpieceSize : </span><span>{item.min_piece_size}</span></List.Item>
                                <List.Item><span>Miner : </span><span>{item.miner}</span></List.Item>
                                <List.Item><span>Price : </span><span>{item.price}</span></List.Item>
                                <List.Item><span>Seq_No : </span><span>{item.seq_no}</span></List.Item>
                                <List.Item><span>Timestamp : </span><span>{item.timestamp}</span></List.Item>
                                <List.Item><span>Verified : </span><span>{item.verified_price}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'pieceslist-cids') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`Cid: ${item.cid}`}>
                            <List className="my-list">
                                <List.Item><span>Cid : </span><span>{item.cid}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'piecescid-info') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`PieceCid: ${item.pieceCid}`}>
                            <List className="my-list">
                                <List.Item><span>PieceCid : </span><span>{item.pieceCid}</span></List.Item>
                                <List.Item><span>offset : </span><span>{item.offset}</span></List.Item>
                                <List.Item><span>Size : </span><span>{item.size}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'sectorssectorslist') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`PieceCid: ${item.pieceCid}`}>
                            <List className="my-list">
                                <List.Item><span>PieceCid : </span><span>{item.pieceCid}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'sectorsstatus') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`ISGarbageSector: ${item.isgarbagesector}`}>
                            <List className="my-list">
                                <List.Item><span>ISGarbageSector : </span><span>{item.isgarbagesector}</span></List.Item>
                                <List.Item><span>Status : </span><span>{item.status}</span></List.Item>
                                <List.Item><span>CIDcommD : </span><span>{item.cidcommd}</span></List.Item>
                                <List.Item><span>CIDcommR : </span><span>{item.cidcommr}</span></List.Item>
                                <List.Item><span>Ticket : </span><span>{item.ticket}</span></List.Item>
                                <List.Item><span>TicketH : </span><span>{item.ticketh}</span></List.Item>
                                <List.Item><span>Seed : </span><span>{item.seed}</span></List.Item>
                                <List.Item><span>SeedH : </span><span>{item.seedh}</span></List.Item>
                                <List.Item><span>Precommit : </span><span>{item.precommit}</span></List.Item>
                                <List.Item><span>Commit : </span><span>{item.commit}</span></List.Item>
                                <List.Item><span>Proof : </span><span>{item.proof}</span></List.Item>
                                <List.Item><span>Deals : </span><span>{item.deals}</span></List.Item>
                                <List.Item><span>Retries : </span><span>{item.retries}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            }
        }

        const data = [
            {
                month: "2015-01-01",
                acc: 84.0,
                type: '有效算力'
            },
            {
                month: "2015-02-01",
                acc: 14.9,
                type: '有效算力'
            },
            {
                month: "2015-03-01",
                acc: 17.0,
                type: '有效算力'
            },
            {
                month: "2015-04-01",
                acc: 20.2,
                type: '有效算力'
            },
            {
                month: "2015-05-01",
                acc: 55.6,
                type: '有效算力'
            },
            {
                month: "2015-06-01",
                acc: 56.7,
                type: '有效算力'
            },
            {
                month: "2015-07-01",
                acc: 30.6,
                type: '有效算力'
            },
            {
                month: "2015-08-01",
                acc: 63.2,
                type: '有效算力'
            },
            {
                month: "2015-09-01",
                acc: -24.6,
                type: '有效算力'
            },
            {
                month: "2015-10-01",
                acc: 14.0,
                type: '有效算力'
            },
            {
                month: "2015-11-01",
                acc: 9.4,
                type: '有效算力'
            },
            {
                month: "2015-12-01",
                acc: 6.3,
                type: '有效算力'
            }
        ];
        const cols = {
            month: {
                nice: true,
                alias: "月份"
            },
            acc: {
                nice: true,
                alias: "积累量"
            }
        };
        const colors = ["#6394f9", "#62daaa"];




        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="lotusMiner" />
                    <div className="content" style={{ paddingTop: '50px' }}>
                        {
                            this.state.isShowSearch && (
                                <div className="search_wrap">
                                    <SearchBar
                                        placeholder="Search"
                                        onSubmit={this.handleSearchBtn}
                                    />
                                </div>
                            )
                        }
                        <div className="tabs_wrap">
                            <Tabs tabs={tabs} swipeable={false} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} onTabClick={this.handleTabsOnChange} />}>
                                {renderContent}
                            </Tabs>
                        </div>
                        <div className="list_wrap">
                            <List renderHeader={() => '结果'} className="my-list">
                                {listHtml != null && listHtml}
                            </List>
                        </div>
                        {/* <div style={{ width: '100%' }}>
                            <Chart height={300} data={data} scale={cols} forceFit padding={[20, 30, 40, 30]}>
                                <Axis
                                    name="month"
                                    title={null}
                                    tickLine={null}
                                    line={{
                                        stroke: "#E6E6E6"
                                    }}
                                />
                                <Axis
                                    name="acc"
                                    line={false}
                                    tickLine={null}
                                    grid={null}
                                    title={null}
                                />
                                <Tooltip />
                                <Legend name="type" />
                                <Geom
                                    type="line"
                                    position="month*acc"
                                    size={1}
                                    color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                                    shape="smooth"
                                    style={{
                                        shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                        shadowBlur: 60,
                                        shadowOffsetY: 6
                                    }}
                                />
                            </Chart>
                        </div> */}
                    </div>
                    {/* <div className="content" style={{ marginTop: '100px' }}>
                        欢迎来到lotusMiner页面
                    </div> */}
                </div>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('lotusMiner').get('isLoading'),
    name: state.get('lotusMiner').get('name'),
    type: state.get('lotusMiner').get('type'),
    lotusOrderList: state.get('lotusMiner').get('lotusOrderList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    // （handleLotusOrders）自定义这个函数名 用这个函数名派发action
    handleLotusOrders: (options) => {
        dispatch(actionCreator.handleLotusOrdersAction(options))
    },
    handleSearch: (options) => {
        dispatch(actionCreator.handleSearchAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LotusHelp)
