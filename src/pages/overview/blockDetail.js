// lotusMiner页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { List, SegmentedControl, Pagination, Icon } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'

class BlockDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false, // 不能删
            newListType: '消息列表',
            newListSelectType: '',
            currentPage: 1
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.newListSelectOnChange = this.newListSelectOnChange.bind(this)
        this.newListPaginationChange = this.newListPaginationChange.bind(this)
        this.handleGoPage = this.handleGoPage.bind(this)
    }
    onOpenChange(args) {
        this.setState({ open: !this.state.open });
    }
    componentDidMount() {
        // console.log('参数----------', this.props.location.state.parameter);
        // 调用发送方函数, 处理区块Id详情数据
        let blockDetailOptions = {name: 'minerblockdetail', address: this.props.location.state.parameter}
        this.props.handleBlockDetail(blockDetailOptions)
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minerblockmessage', page: 1, address: this.props.location.state.parameter}
        this.props.handleBlockNewList(newListOptions)
        setInterval(() => {
            this.props.handleBlockDetail(blockDetailOptions)
            this.props.handleBlockNewList(newListOptions)
        }, 7800000)
    }
    // 消息列表下拉框变化回调
    newListSelectOnChange (e) {
        console.log(1231231, e.target.value)
        this.setState({newListSelectType: e.target.value, currentPage: 1})
        // 调用发送方函数, 处理消息列表数据
        let newListOptions = {name: 'minerblockmessage', page: 1, method: e.target.value, address: this.props.location.state.parameter}
        this.props.handleBlockNewList(newListOptions)
    }
    // 消息列表分页器变化回调
    newListPaginationChange (val) {
        this.setState({currentPage: val})
        let options = {
            name: 'minerblockmessage',
            page: val,
            method: this.state.newListSelectType,
            address: this.props.location.state.parameter
        }
        // 调用发送方函数, 处理消息列表数据
        this.props.handleBlockNewList(options)
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
        let { newListData, newListSelectData, totalCount, blockIdDetailData } = this.props
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------
        let tableData = []
        if (newListData.toJS().length > 0) {
            if (this.state.newListType == '' || this.state.newListType == '消息列表') {
                tableData = newListData.toJS().map((item, index) => (
                    <div className="newList_item">
                        <div><span>消息ID: </span><span onClick={ () => this.handleGoPage(item.Cid, 'messageIdDetailPage')}>{item.Cid}</span></div>
                        <div><span>发送方: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.From, 'senderDetailPage')}>{item.From}</span></div>
                        <div><span>接收方: </span><span style={{color: '#1a4fc9'}}>{item.To}</span></div>
                        <div><span>方法: </span><span>{item.Method}</span></div>
                        <div><span>金额: </span><span>{item.Balance}</span></div>
                        <div><span>状态: </span><span>{item.Status}</span></div>
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
                        <div className="blockDetail_wrap">
                            <div className="blockDetail_box">
                                <div className="content_top">
                                    <div>区块详情</div>
                                </div>
                                {
                                    blockIdDetailData != '' && (
                                        <div className="content_bottom">
                                            <div><span>区块ID</span><span>{blockIdDetailData.BlockId}</span></div>
                                            <div><span>高度</span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(blockIdDetailData.Height, 'heightDetailPage')}>{blockIdDetailData.Height}</span></div>
                                            <div><span>矿工</span><span style={{color: '#1a4fc9'}} onClick={() => { this.props.history.push({ pathname: "/overview" }) }}>{blockIdDetailData.Miner}</span></div>
                                            <div><span>时间</span><span>{blockIdDetailData.Times}</span></div>
                                            <div><span>大小</span><span>{blockIdDetailData.Size}</span></div>
                                            <div><span>消息</span><span>{blockIdDetailData.MessageCount}</span></div>
                                            <div><span>奖励</span><span>{blockIdDetailData.Reward}</span></div>
                                            <div><span>奖励份数</span><span>{blockIdDetailData.WinCount}</span></div>
                                            <div><span>父区块</span><span>{blockIdDetailData.ParentBlocks.length > 0 && blockIdDetailData.ParentBlocks.map((item, index) => (<span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item, 'blockDetailPage')}>{item}</span>))}</span></div>
                                            <div><span>父区块权重</span><span>{blockIdDetailData.ParentWeight}</span></div>
                                            <div><span>罚金</span><span>{blockIdDetailData.Penalty}</span></div>
                                            <div><span>Parent Base Fee</span><span>{blockIdDetailData.ParentBaseFee}</span></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="newList_wrap">
                            <div className="newList_box">
                                <div className="content_top" style={{justifyContent: 'flex-start'}}>
                                    消息列表
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
    newListData: state.get('overview').get('newListData'),
    newListSelectData: state.get('overview').get('newListSelectData'),
    totalCount: state.get('overview').get('totalCount'),
    blockIdDetailData: state.get('overview').get('blockIdDetailData')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleBlockDetail: (options) => {
        dispatch(actionCreator.handleBlockDetailAction(options))
    },
    handleBlockNewList: (options) => {
        dispatch(actionCreator.handleBlockNewListAction(options))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetail)
