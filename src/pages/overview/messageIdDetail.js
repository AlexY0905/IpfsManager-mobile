// lotusMiner页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { List, SegmentedControl, Pagination, Icon } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'
import { Pie } from '@ant-design/charts';
import { Tooltip, Chart, Geom, Axis, Legend } from 'bizcharts';
const Item = List.Item;


let overviewIsOne = true
let timer = null
class MessageIdDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false, // 不能删
        }
        this.onOpenChange = this.onOpenChange.bind(this)
        this.handleGoPage = this.handleGoPage.bind(this)
    }
    onOpenChange(args) {
        this.setState({ open: !this.state.open });
    }
    componentDidMount() {
        // console.log('参数----------', this.props.location.state.parameter);
        // 调用发送方函数, 处理消息id详情数据
        let options = {
            name: 'minermessageinfo',
            address: this.props.location.state.parameter
        }
        this.props.handleMsgIdDetailData(options)
        setInterval(() => {
            this.props.handleMsgIdDetailData(options)
        }, 7800000)
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
        let { msgIdDetailMsgData, msgIdDetailAccountData, msgIdDetailOthersData } = this.props
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------
        let accountMsgData = []
        if (msgIdDetailAccountData.toJS().length > 0) {
            accountMsgData = msgIdDetailAccountData.toJS().map((item, index) => (
                <div className="bottom_item_wrap">
                    <div><span>发送方: </span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item.FromAddress, 'senderDetailPage')}>{item.FromAddress}</span></div>
                    <div>
                        <span>接收方: </span>
                        <div style={{flex: '1.5'}}>
                            <span style={{flex: '0.5'}}>{item.ToAddress}</span>
                            {
                                item.ToTags != null && item.ToTags.signed && (
                                    <span style={{flex: '1', border: '1px solid #e2e8f0', borderRadius: '30px', textAlign: 'center', padding: '3px'}}>
                                        {item.ToTags.name}
                                        <span><img src="https://filfox.info/dist/img/signed.16bca8b.svg" style={{width: '12px', marginLeft: '5px'}} /></span>
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    <div><span>金额: </span><span>{item.Balance}</span></div>
                    <div><span>类型: </span><span>{item.Types}</span></div>
                </div>
            ))
        }
        // ---------------------------------------------- 消息列表表格数据 ----------------------------------------

        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="矿工概览" isBack={true} />
                    <div className="content" style={{ paddingTop: '45px', textAlign: 'left' }}>
                        <div className="messageDetail_wrap">
                            <div className="messageDetail_box">
                                <div className="content_top">
                                    <span>消息概览</span>
                                </div>
                                {
                                    msgIdDetailMsgData != '' && (
                                        <div className="content_bottom">
                                            <div><span>消息ID</span><span>{msgIdDetailMsgData.MessageId}</span></div>
                                            <div><span>高度</span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(msgIdDetailMsgData.Height, 'heightDetailPage')}>{msgIdDetailMsgData.Height}</span></div>
                                            <div><span>时间</span><span>{msgIdDetailMsgData.Times}</span></div>
                                            <div><span>所属区块</span><span>{msgIdDetailMsgData.Blocks.length > 0 && msgIdDetailMsgData.Blocks.map((item, index) => (<span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(item, 'blockDetailPage')}>{item}</span>))}</span></div>
                                            <div><span>发送方</span><span style={{color: '#1a4fc9'}} onClick={ () => this.handleGoPage(msgIdDetailMsgData.FromAddress, 'senderDetailPage')}>{msgIdDetailMsgData.FromAddress}</span></div>
                                            <div><span>接收方</span><span style={{color: '#1a4fc9'}} onClick={() => { this.props.history.push({ pathname: "/overview" }) }}>{msgIdDetailMsgData.ToAddress}</span></div>
                                            <div><span>方法</span><span>{msgIdDetailMsgData.Method}</span></div>
                                            <div><span>金额</span><span>{msgIdDetailMsgData.Balance}</span></div>
                                            <div><span>状态</span><span>{msgIdDetailMsgData.Status}</span></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="accountsDetail_wrap">
                            <div className="accountsDetail_box">
                                <div className="content_top">
                                    <span>转账信息</span>
                                </div>
                                <div className="content_bottom">
                                    {
                                        accountMsgData.length > 0 && accountMsgData
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="otherMsg_wrap">
                            <div className="otherMsg_box">
                                <div className="content_top">
                                    <span>其它信息</span>
                                </div>
                                {
                                    msgIdDetailOthersData != '' && (
                                        <div className="content_bottom">
                                            <div><span>版本</span><span>{msgIdDetailOthersData.Version}</span></div>
                                            <div><span>Nonce</span><span>{msgIdDetailOthersData.Nonce}</span></div>
                                            <div><span>Gas Fee Cap</span><span>{msgIdDetailOthersData.GasFeeCap}</span></div>
                                            <div><span>Gas Premium</span><span>{msgIdDetailOthersData.GasPremium}</span></div>
                                            <div><span>Gas Limit</span><span>{msgIdDetailOthersData.GasLimit}</span></div>
                                            <div><span>Gas 使用量</span><span>{msgIdDetailOthersData.GasUsed}</span></div>
                                            <div><span>Base Fee</span><span>{msgIdDetailOthersData.BasFee}</span></div>
                                            <div><span>参数</span><span><pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(msgIdDetailOthersData.Params)}</pre></span></div>
                                            <div><span>返回值</span><span>{msgIdDetailOthersData.Return}</span></div>
                                        </div>
                                    )
                                }
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
    msgIdDetailMsgData: state.get('overview').get('msgIdDetailMsgData'),
    msgIdDetailAccountData: state.get('overview').get('msgIdDetailAccountData'),
    msgIdDetailOthersData: state.get('overview').get('msgIdDetailOthersData')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleMsgIdDetailData: (options) => {
        dispatch(actionCreator.handleMsgIdDetailDataAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageIdDetail)
