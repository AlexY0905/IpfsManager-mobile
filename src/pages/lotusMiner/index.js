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

let timer = null
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

    handleServerBtn(type) { // 所有按钮的点击事件
        if (timer != null) {
            clearInterval(timer)
        }
        let options = {
            name: ''
        }
        switch (type) {
            case 'list':
                options.name = 'lotusminerstoragedealslist' // 改成后台给的name
                this.setState({ isShowSearch: false })
                return false
            case 'get-ask':
                options.name = 'lotusminerstoragedealsgetask'
                this.setState({ isShowSearch: false })
                break
            case 'cid-info':
                options.name = 'lotusminerpiecescidinfo'
                this.setState({ modalOrder: 'lotusminerpiecescidinfo', isShowSearch: true })
                return false
            case 'status':
                options.name = 'lotusminersectorsstatus'
                this.setState({ modalOrder: 'lotusminersectorsstatus', isShowSearch: true })
                return false
        }

        // 调用发送方函数, 处理lotus命令
        this.props.handleLotusMiner(options)
        timer = setInterval(() => { // 十一分钟刷新一次数据
            this.props.handleLotusMiner(options)
        }, 660000)
        this.setState({
            modalType: type
        })
    }


    handleSearchBtn(val) { // 处理搜索
        const { modalOrder } = this.state
        if (val == '') {
            Toast.fail('搜索框不能为空 !')
            return false
        }
        let options = {
            name: modalOrder,
            info: val,
            num: '',
            type: ''
        }

        console.log('options---------', options)
        //调用发送方函数, 处理搜索
        this.props.handleSearch(options)
    }

    handleTabsOnChange(item) {
        console.log('============', item)
        this.setState({ isShowSearch: false })
    }



    render() {
        let { name, type, lotusminerlist } = this.props
        let { modalType } = this.state
        const tabs = [ // 选项卡切换
            { title: 'storage-deals' },
            // { title: 'pieces' },
            // { title: 'sectors' }
        ];
        let renderContent = tabs.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                {
                    item.title == 'storage-deals' && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {/* <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('list')}>list</Button> */}
                            <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('get-ask')}>get-ask</Button>
                        </div>
                    )
                    ||
                    item.title == 'pieces' && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('cid-info')}>cid-info</Button>
                        </div>
                    )
                    ||
                    item.title == 'sectors' && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button style={{ width: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('status')}>status</Button>
                        </div>
                    )
                }
            </div>
        ))
        let listHtml = null
        if (lotusminerlist.toJS().length > 0) {
            if (name == 'storagedealslist') {
                listHtml = lotusminerlist.toJS().map((item, index) => (
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
                listHtml = lotusminerlist.toJS().map((item, index) => (
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
            } else if (name == 'lotusminerpiecescidinfo' && type) {
                listHtml = lotusminerlist.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`cid-info`}>
                            <List className="my-list">
                                <List.Item><span>Id : </span><span>{item.id}</span></List.Item>
                                <List.Item><span>Cid : </span><span>{item.cid}</span></List.Item>
                                <List.Item><span>BlockSize : </span><span>{item.block_size}</span></List.Item>
                                <List.Item><span>PiecesCid : </span><span>{item.pieces_cid}</span></List.Item>
                                <List.Item><span>RelOffset : </span><span>{item.rel_offset}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusminersectorsstatus' && type) {
                listHtml = lotusminerlist.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`status`}>
                            <List className="my-list">
                                <List.Item><span>SectorID : </span><span>{item.SectorID}</span></List.Item>
                                <List.Item><span>ISGarbageSector : </span><span>{item.ISGarbageSector}</span></List.Item>
                                <List.Item><span>Status : </span><span>{item.Status}</span></List.Item>
                                <List.Item><span>CIDcommD : </span><span>{item.CIDcommD}</span></List.Item>
                                <List.Item><span>CIDcommR : </span><span>{item.CIDcommR}</span></List.Item>
                                <List.Item><span>Ticket : </span><span>{item.Ticket}</span></List.Item>
                                <List.Item><span>TicketH : </span><span>{item.TicketH}</span></List.Item>
                                <List.Item><span>Seed : </span><span>{item.Seed}</span></List.Item>
                                <List.Item><span>SeedH : </span><span>{item.SeedH}</span></List.Item>
                                <List.Item><span>Precommit : </span><span>{item.Precommit}</span></List.Item>
                                <List.Item><span>Commit : </span><span>{item.Commit}</span></List.Item>
                                <List.Item><span>Proof : </span><span>{item.Proof}</span></List.Item>
                                <List.Item><span>Deals : </span><span>{item.Deals}</span></List.Item>
                                <List.Item><span>Retries : </span><span>{item.Retries}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            }
        }

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
                    </div>
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
    lotusminerlist: state.get('lotusMiner').get('lotusminerlist')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    // （handleLotusMiner）自定义这个函数名 用这个函数名派发action
    handleLotusMiner: (options) => {
        dispatch(actionCreator.handleLotusMinerAction(options))
    },
    handleSearch: (options) => {
        dispatch(actionCreator.handleSearchAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LotusHelp)
