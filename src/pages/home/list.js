// lotus命令页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { Tabs, List, Button, Accordion, SearchBar, Toast, Modal, InputItem } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";

const Item = List.Item;



class HomeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            data: '',
            visible: false,
            modalType: '',
            modalOrder: '',
            isShowSearch: false,
            isSearchShow: false,
            isShowSectorBtn: false,
            isShowFindBtn: false,
            sectorAddress: '',
            sectorNumber: '',
            searchVal: ''
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.handleServerBtn = this.handleServerBtn.bind(this)
        this.handleSearchBtn = this.handleSearchBtn.bind(this)
        this.handleTabsOnChange = this.handleTabsOnChange.bind(this)
        this.addressChange = this.addressChange.bind(this)
        this.numberChange = this.numberChange.bind(this)
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
        this.onCloseSectorModal = this.onCloseSectorModal.bind(this)
        this.handleSearchFindBtn = this.handleSearchFindBtn.bind(this)
        this.handleFindBtnChange = this.handleFindBtnChange.bind(this)
    }
    componentDidMount() {
        // 在生命周期调用发送方的数据

    }
    onOpenChange(args) {
        console.log(':::::::--------', args);
        this.setState({ open: !this.state.open });
    }
    handleServerBtn(type) { // 所有按钮的点击事件
        let options = {
            name: ''
        }
        switch (type) {
            case 'list':
                options.name = 'lotuswalletlist'
                this.setState({ isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false })
                break
            case 'list-deals':
                options.name = 'lotusclientlistdeals'
                this.setState({ isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false })
                break
            case 'pending':
                options.name = 'lotusmpoolpending'
                this.setState({ isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false })
                break
            case 'find':
                options.name = 'lotusmpoolfind'
                this.setState({ modalOrder: 'lotusmpoolfind', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: true })
                break
            case 'config':
                options.name = 'lotusmpoolconfig'
                this.setState({ isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false })
                break
            case 'gas-perf':
                options.name = 'lotusmpoolgasperf'
                this.setState({ isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false })
                break
            case 'power':
                options.name = 'lotusstatepower'
                this.setState({ isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false })
                break
            case 'active-sectors':
                options.name = 'lotusstateactivesectors'
                this.setState({ modalOrder: 'lotusstateactivesectors', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false })
                return false
            case 'list-actors':
                options.name = 'lotusstatelistactors'
                this.setState({ modalOrder: 'lotusstatelistactors', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false })
                return false
            case 'list-miners':
                options.name = 'lotusstatelistminers'
                this.setState({ modalOrder: 'lotusstatelistminers', isShowSearch: true, isShowSectorBtn: true, isShowFindBtn: false })
                return false
            case 'get-actor':
                options.name = 'lotusstategetactor'
                this.setState({ isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false })
                break
            case 'miner-info':
                options.name = 'lotusstateminerinfo'
                this.setState({ isShowSearch: false, isShowSectorBtn: false, isShowFindBtn: false })
                break
            case 'sector':
                options.name = 'lotusstatesector'
                this.setState({ modalOrder: 'lotusstatesector', visible: true, isShowFindBtn: false })
                return false
            case 'read-state':
                options.name = 'lotusstatereadstate'
                this.setState({ modalOrder: 'lotusstatereadstate', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false })
                return false
            case 'getblock':
                options.name = 'lotuschaingetblock'
                this.setState({ modalOrder: 'lotuschaingetblock', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false })
                break
            case 'getmessage':
                options.name = 'lotuschaingetmessage'
                this.setState({ modalOrder: 'lotuschaingetmessage', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false })
                return false
            case 'gas-price':
                options.name = 'lotuschaingasprice'
                this.setState({ modalOrder: 'lotuschaingasprice', isShowSearch: true, isShowSectorBtn: false, isShowFindBtn: false })
                return false
        }

        // 调用发送方函数, 处理lotus命令
        this.props.handleLotusOrders(options)
        setInterval(() => { // 十一分钟刷新一次数据
            this.props.handleLotusOrders(options)
        }, 660000)

        this.setState({
            modalType: type
        })
    }
    handleSearchBtn(val) { // 处理搜索
        const { modalOrder } = this.state
        if (modalOrder == 'lotusmpoolfind') {
            Toast.fail('请点击搜索框下方的搜索按钮进行搜索')
            return false
        }
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
        if (modalOrder == 'lotuschaingetblock') {
            this.props.history.push({ pathname: "/home/homeSearch", state: { cid: val } });
        } else {
            console.log('options---------', options)
            // 调用发送方函数, 处理搜索
            this.props.handleSearch(options)
        }
    }
    handleTabsOnChange(item) {
        console.log('============', item)
    }
    addressChange(val) {
        this.setState({ sectorAddress: val })
    }
    numberChange(val) {
        this.setState({ sectorNumber: val })
    }
    handleSubmitSearch() {
        const { sectorAddress, sectorNumber, modalOrder } = this.state
        console.log('sectorAddress----------', sectorAddress)
        console.log('sectorNumber----------', sectorNumber)
        console.log('modalOrder----------', modalOrder)

        if (sectorAddress == '') {
            Toast.fail('miner address 不能为空 !')
            return false
        } else if (sectorNumber == '') {
            Toast.fail('sector number 不能为空 !')
            return false
        } else {
            // 调用发送方函数, 处理搜索sector
            let options = {
                name: modalOrder,
                info: sectorAddress,
                num: sectorNumber,
                type: ''
            }
            this.props.handleSearch(options)
        }

        this.setState({
            visible: false
        })


    }
    onCloseSectorModal() {
        this.setState({ visible: false })
    }
    handleSearchFindBtn(type) {
        const { searchVal, modalOrder } = this.state
        if (searchVal == '') {
            Toast.fail('搜索框不能为空 !')
            return false
        }
        let options = {
            name: modalOrder,
            info: searchVal,
            num: '',
            type: type
        }
        console.log('find 搜索---------', options)
        // 调用发送方函数, 处理搜索find按钮 
        this.props.handleSearch(options)
    }
    handleFindBtnChange(val) {
        console.log('val---------', val)
        this.setState({ searchVal: val })
    }


    render() {
        let { name, type, lotusOrderList } = this.props
        let { modalType } = this.state
        const tabs = [
            { title: 'lotus wallet' },
            { title: 'lotus client' },
            { title: 'lotus mpool' },
            { title: 'lotus state' },
            { title: 'lotus chain' }
        ];
        let renderContent = tabs.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                {
                    item.title == 'lotus wallet' && <Button style={{ minWidth: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('list')}>list</Button>
                    ||
                    item.title == 'lotus client' &&
                    <div>
                        {/* <Button style={{ minWidth: '100px' }} type="primary" size="small" onClick={() => this.handleServerBtn('list-deals')}>list-deals</Button> */}
                    </div>
                    ||
                    item.title == 'lotus mpool' && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '5px' }}>
                            <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('pending')}>pending</Button>
                            <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('find')}>find</Button>
                            <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('config')}>config</Button>
                            <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('gas-perf')}>gas-perf</Button>
                        </div>
                    )
                    ||
                    item.title == 'lotus state' && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '5px' }}>
                            <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('power')}>power</Button>
                            <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('active-sectors')}>active-sectors</Button>
                            <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('list-actors')}>list-actors</Button>
                            <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('list-miners')}>list-miners</Button>
                            {
                                this.state.isShowSectorBtn && <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('sector')}>sector</Button>
                            }
                            <Button style={{ minWidth: '100px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('read-state')}>read-state</Button>
                        </div>
                    )
                    ||
                    item.title == 'lotus chain' && (
                        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '5px' }}>
                            {/* <Button style={{ minWidth: '100px', marginRight: '5px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('getblock')}>getblock</Button> */}
                            <Button style={{ minWidth: '100px', marginRight: '5px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('getmessage')}>getmessage</Button>
                            <Button style={{ minWidth: '100px', marginRight: '5px', marginBottom: '5px' }} type="primary" size="small" onClick={() => this.handleServerBtn('gas-price')}>gas-price</Button>
                        </div>
                    )
                }
            </div>
        ))
        let listHtml = null
        if (lotusOrderList.toJS().length > 0) {
            if (name == 'lotuswalletlist') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`Address: ${item.address}`}>
                            <List className="my-list">
                                <List.Item><span>Address : </span><span>{item.address}</span></List.Item>
                                <List.Item><span>Balance : </span><span>{item.balance}</span></List.Item>
                                <List.Item><span>Nonce : </span><span>{item.nonce}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            }
            /*
            else if (name == 'lotusclientqueryask') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`Ask: ${item.ask}`}>
                            <List className="my-list">
                                <List.Item><span>Ask : </span><span>{item.ask}</span></List.Item>
                                <List.Item><span>Price per : </span><span>{item.price}</span></List.Item>
                                <List.Item><span>Verified : </span><span>{item.verified_price}</span></List.Item>
                                <List.Item><span>Max piece size : </span><span>{item.max}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            }
             */
            else if (name == 'lotusmpoolconfig') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`GasLimitOverestimation: ${item.gas_limit_overestimation}`}>
                            <List className="my-list">
                                <List.Item><span>PriorityAddrs : </span><span>{item.priority_addrs}</span></List.Item>
                                <List.Item><span>PruneCooldown : </span><span>{item.prune_cooldown}</span></List.Item>
                                <List.Item><span>ReplaceByFeeRatio : </span><span>{item.replace_by_fee_ratio}</span></List.Item>
                                <List.Item><span>SizeLimitHigh : </span><span>{item.size_limit_high}</span></List.Item>
                                <List.Item><span>SizeLimitLow : </span><span>{item.size_limit_low}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusmpoolgasperf') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`Address: ${item.Address}`}>
                            <List className="my-list">
                                <List.Item><span>Address : </span><span>{item.Address}</span></List.Item>
                                <List.Item><span>Height : </span><span>{item.Height}</span></List.Item>
                                <List.Item><span>OrderNumber : </span><span>{item.orderNumber}</span></List.Item>
                                <List.Item><span>Number : </span><span>{item.Number}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusstatepower') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`totalPowerQuality: ${item.total_power_quality}`}>
                            <List className="my-list">
                                <List.Item><span>totalPowerQuality : </span><span>{item.total_power_quality}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusstateactivesectors' && type) {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel>
                            <List className="my-list">
                                <List.Item><span>SealedCid : </span><span>{item.sealed_cid}</span></List.Item>
                                <List.Item><span>SectorNumber : </span><span>{item.sector_number}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusmpoolpending') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`Message-Version: ${item.Message - Version}`}>
                            <List className="my-list">
                                <List.Item><span>Message-Version : </span><span>{item.Message - Version}</span></List.Item>
                                <List.Item><span>Message-To : </span><span>{item.Message - To}</span></List.Item>
                                <List.Item><span>Message-From : </span><span>{item.Message - From}</span></List.Item>
                                <List.Item><span>Message-Nonce : </span><span>{item.Message - Nonce}</span></List.Item>
                                <List.Item><span>Message-Value : </span><span>{item.Message - Value}</span></List.Item>
                                <List.Item><span>Message-GasLimit : </span><span>{item.Message - GasLimit}</span></List.Item>
                                <List.Item><span>Message-GasFeeCap : </span><span>{item.Message - GasFeeCap}</span></List.Item>
                                <List.Item><span>Message-GasPremium : </span><span>{item.Message - GasPremium}</span></List.Item>
                                <List.Item><span>Message-Method : </span><span>{item.Message - Method}</span></List.Item>
                                <List.Item><span>Message-Params : </span><span>{item.Message - Params}</span></List.Item>
                                <List.Item><span>Message-Type : </span><span>{item.Message - Type}</span></List.Item>
                                <List.Item><span>Message-Data : </span><span>{item.Message - Data}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusmpoolfind' && !type) {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`From: ${item.From}`}>
                            <List className="my-list">
                                <List.Item><span>From : </span><span>{item.From}</span></List.Item>
                                <List.Item><span>Method : </span><span>{item.Method}</span></List.Item>
                                <List.Item><span>To : </span><span>{item.To}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusmpoolfind' && type) {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`Id: ${item.id}`}>
                            <List className="my-list">
                                <List.Item><span>Id : </span><span>{item.id}</span></List.Item>
                                <List.Item><span>CId : </span><span>{item.CId}</span></List.Item>
                                <List.Item><span>Version : </span><span>{item.version}</span></List.Item>
                                <List.Item><span>ToAddress : </span><span>{item.to_address}</span></List.Item>
                                <List.Item><span>FromAddress : </span><span>{item.from_address}</span></List.Item>
                                <List.Item><span>Nonce : </span><span>{item.nonce}</span></List.Item>
                                <List.Item><span>Value : </span><span>{item.value}</span></List.Item>
                                <List.Item><span>GasLimit : </span><span>{item.gas_limit}</span></List.Item>
                                <List.Item><span>GasFeeCap : </span><span>{item.gas_fee_cap}</span></List.Item>
                                <List.Item><span>GasPremium : </span><span>{item.gas_premium}</span></List.Item>
                                <List.Item><span>Method : </span><span>{item.method}</span></List.Item>
                                <List.Item><span>Params : </span><span>{item.Params}</span></List.Item>
                                <List.Item><span>Type : </span><span>{item.Type}</span></List.Item>
                                <List.Item><span>Data : </span><span>{item.Data}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusclientlist-deals') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`Created: ${item.Created}`}>
                            <List className="my-list">
                                <List.Item><span>Created : </span><span>{item.Created}</span></List.Item>
                                <List.Item><span>DealCid : </span><span>{item.DealCid}</span></List.Item>
                                <List.Item><span>DealId : </span><span>{item.DealId}</span></List.Item>
                                <List.Item><span>Provider : </span><span>{item.Provider}</span></List.Item>
                                <List.Item><span>State : </span><span>{item.State}</span></List.Item>
                                <List.Item><span>OnChain : </span><span>{item.OnChain}</span></List.Item>
                                <List.Item><span>Slashed : </span><span>{item.Slashed}</span></List.Item>
                                <List.Item><span>PieceCID : </span><span>{item.PieceCID}</span></List.Item>
                                <List.Item><span>Size : </span><span>{item.Size}</span></List.Item>
                                <List.Item><span>Price : </span><span>{item.Price}</span></List.Item>
                                <List.Item><span>Duration : </span><span>{item.Duration}</span></List.Item>
                                <List.Item><span>Verified : </span><span>{item.Verified}</span></List.Item>
                                <List.Item><span>Message : </span><span>{item.Message}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusstatepower') {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion className="my-accordion">
                        <Accordion.Panel header={`totalPowerQuality: ${item.total_power_quality}`}>
                            <List className="my-list">
                                <List.Item><span>totalPowerQuality : </span><span>{item.total_power_quality}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusstatelistactors' && type) {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`Address: ${item.Address}`}>
                            <List className="my-list">
                                <List.Item><span>Address : </span><span>{item.Address}</span></List.Item>
                                <List.Item><span>Balance : </span><span>{item.Balance}</span></List.Item>
                                <List.Item><span>Nonce : </span><span>{item.Nonce}</span></List.Item>
                                <List.Item><span>Code : </span><span>{item.Code}</span></List.Item>
                                <List.Item><span>Head : </span><span>{item.Head}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusstatereadstate' && type) {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel>
                            <List className="my-list">
                                <List.Item><span>AllocatedSectors : </span><span>{item.AllocatedSectors}</span></List.Item>
                                <List.Item><span>CurrentDeadline : </span><span>{item.CurrentDeadline}</span></List.Item>
                                <List.Item><span>Deadlines : </span><span>{item.Deadlines}</span></List.Item>
                                <List.Item><span>EarlyTerminations : </span><span>{item.EarlyTerminations}</span></List.Item>
                                <List.Item><span>FeeDebt : </span><span>{item.FeeDebt}</span></List.Item>
                                <List.Item><span>Info : </span><span>{item.Info}</span></List.Item>
                                <List.Item><span>InitialPledge : </span><span>{item.InitialPledge}</span></List.Item>
                                <List.Item><span>LockedFunds : </span><span>{item.LockedFunds}</span></List.Item>
                                <List.Item><span>PreCommitDeposits : </span><span>{item.PreCommitDeposits}</span></List.Item>
                                <List.Item><span>PreCommittedSectors : </span><span>{item.PreCommittedSectors}</span></List.Item>
                                <List.Item><span>PreCommittedSectorExpiry : </span><span>{item.PreCommittedSectorExpiry}</span></List.Item>
                                <List.Item><span>ProvingPeriodStart : </span><span>{item.ProvingPeriodStart}</span></List.Item>
                                <List.Item><span>Sectors : </span><span>{item.Sectors}</span></List.Item>
                                <List.Item><span>VestingFunds : </span><span>{item.VestingFunds}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusstatelistminers' && type) {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`ActualPower: ${item.ActualPower}`}>
                            <List className="my-list">
                                <List.Item><span>ActualPower : </span><span>{item.ActualPower}</span></List.Item>
                                <List.Item><span>AvailableBalance : </span><span>{item.AvailableBalance}</span></List.Item>
                                <List.Item><span>BytePower : </span><span>{item.BytePower}</span></List.Item>
                                <List.Item><span>ConsensusFaultEnd : </span><span>{item.ConsensusFaultEnd}</span></List.Item>
                                <List.Item><span>Control : </span><span>{item.Control}</span></List.Item>
                                <List.Item><span>Multiaddrs : </span><span>{item.Multiaddrs}</span></List.Item>
                                <List.Item><span>Owner : </span><span>{item.Owner}</span></List.Item>
                                <List.Item><span>PeerId : </span><span>{item.PeerId}</span></List.Item>
                                <List.Item><span>SectorSize : </span><span>{item.SectorSize}</span></List.Item>
                                <List.Item><span>Worker : </span><span>{item.Worker}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotusstatesector' && type) {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel>
                            <List className="my-list">
                                <List.Item><span>SectorNumber : </span><span>{item.SectorNumber}</span></List.Item>
                                <List.Item><span>SealProof : </span><span>{item.SealProof}</span></List.Item>
                                <List.Item><span>SealedCID : </span><span>{item.SealedCID}</span></List.Item>
                                <List.Item><span>DealIDs : </span><span>{item.DealIDs}</span></List.Item>
                                <List.Item><span>Activation : </span><span>{item.Activation}</span></List.Item>
                                <List.Item><span>Expiration : </span><span>{item.Expiration}</span></List.Item>
                                <List.Item><span>DealWeight : </span><span>{item.DealWeight}</span></List.Item>
                                <List.Item><span>VerifiedDealWeight : </span><span>{item.VerifiedDealWeight}</span></List.Item>
                                <List.Item><span>InitialPledge : </span><span>{item.InitialPledge}</span></List.Item>
                                <List.Item><span>ExpectedDayReward : </span><span>{item.ExpectedDayReward}</span></List.Item>
                                <List.Item><span>ExpectedStoragePledge : </span><span>{item.ExpectedStoragePledge}</span></List.Item>
                                <List.Item><span>Deadline : </span><span>{item.Deadline}</span></List.Item>
                                <List.Item><span>Partition : </span><span>{item.Partition}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotuschaingetmessage' && type) {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`getMessage`}>
                            <List className="my-list">
                                <List.Item><span>Cid : </span><span>{item.cid}</span></List.Item>
                                <List.Item><span>Data : </span><span>{item.data}</span></List.Item>
                                <List.Item><span>FromAddress : </span><span>{item.from_address}</span></List.Item>
                                <List.Item><span>GasFeeCap : </span><span>{item.gas_fee_cap}</span></List.Item>
                                <List.Item><span>GasLimit : </span><span>{item.gas_limit}</span></List.Item>
                                <List.Item><span>GasPremium : </span><span>{item.gas_premium}</span></List.Item>
                                <List.Item><span>Id : </span><span>{item.id}</span></List.Item>
                                <List.Item><span>Method : </span><span>{item.method}</span></List.Item>
                                <List.Item><span>Nonce : </span><span>{item.Nonce}</span></List.Item>
                                <List.Item><span>Params : </span><span>{item.Params}</span></List.Item>
                                <List.Item><span>ToAddress : </span><span>{item.ToAddress}</span></List.Item>
                                <List.Item><span>Type : </span><span>{item.Type}</span></List.Item>
                                <List.Item><span>Value : </span><span>{item.Value}</span></List.Item>
                                <List.Item><span>Version : </span><span>{item.Version}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            } else if (name == 'lotuschaingasprice' && type) {
                listHtml = lotusOrderList.toJS().map((item, index) => (
                    <Accordion defaultActiveKey="0" className="my-accordion">
                        <Accordion.Panel header={`GasPrice`}>
                            <List className="my-list">
                                <List.Item><span>BlockName : </span><span>{item.BlockName}</span></List.Item>
                                <List.Item><span>ChainGasPrice : </span><span>{item.ChainGasPrice}</span></List.Item>
                            </List>
                        </Accordion.Panel>
                    </Accordion>
                ))
            }   // 在此次接着写新接口的判断

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
                    <HomeSider open={this.state.open} activeTxt="lotus命令" />
                    <div className="content" style={{ paddingTop: '50px' }}>
                        {
                            this.state.isShowSearch && (
                                <div className="search_wrap">
                                    <div>
                                        <SearchBar
                                            placeholder="Search"
                                            onChange={this.handleFindBtnChange}
                                            onSubmit={this.handleSearchBtn}
                                        />
                                    </div>
                                    {
                                        this.state.isShowFindBtn && (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                                                <Button style={{ minWidth: '80px' }} type="primary" size="small" onClick={() => this.handleSearchFindBtn("From")}>搜索 From</Button>
                                                <Button style={{ minWidth: '80px' }} type="primary" size="small" onClick={() => this.handleSearchFindBtn("Method")}>搜索 Method</Button>
                                                <Button style={{ minWidth: '80px' }} type="primary" size="small" onClick={() => this.handleSearchFindBtn("To")}>搜索 To</Button>
                                            </div>
                                        )
                                    }
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
                        <div style={{ width: '100%', background: '#fff' }}>
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
                        </div>
                    </div>
                    {/* ----------------------------------------------- */}
                    <Modal
                        transparent={true}
                        visible={this.state.visible}
                        onClose={this.onCloseSectorModal}
                        animationType="slide-up"
                        afterClose={() => { console.log('afterClose'); }}
                    >
                        <List renderHeader={() => <div>搜索sector</div>} className="popup-list">
                            <List.Item>
                                <InputItem placeholder="miner address" onChange={this.addressChange} style={{ fontSize: '15px' }}></InputItem>
                            </List.Item>
                            <List.Item>
                                <InputItem placeholder="sector number" onChange={this.numberChange} style={{ fontSize: '15px' }}></InputItem>
                            </List.Item>
                            <List.Item>
                                <Button type="primary" size="small" onClick={this.handleSubmitSearch}>搜索</Button>
                            </List.Item>
                        </List>
                    </Modal>
                </div>
            </div>
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('home').get('isLoading'),
    name: state.get('home').get('name'),
    type: state.get('home').get('type'),
    lotusOrderList: state.get('home').get('lotusOrderList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleLotusOrders: (options) => {
        dispatch(actionCreator.handleLotusOrdersAction(options))
    },
    handleSearch: (options) => {
        dispatch(actionCreator.handleSearchAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeList)
