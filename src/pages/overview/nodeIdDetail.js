// lotusMiner页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { List } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'


class BlockDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false, // 不能删
        }
        this.onOpenChange = this.onOpenChange.bind(this)
    }
    onOpenChange(args) {
        this.setState({ open: !this.state.open });
    }
    componentDidMount() {
        console.log('参数----------', this.props.location.state.parameter);
        let options = {name: 'minernodedetail', nodeid: this.props.location.state.parameter}
        // 调用发送方函数, 获取节点详情数据
        this.props.handleGetNodeDetail(options)
    }


    render() {
        let { nodeDetailMsgData } = this.props

        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="矿工概览" isBack={true} />
                    <div className="content" style={{ paddingTop: '45px' }}>
                        <div className="nodeIdDetail_wrap">
                            <div className="nodeIdDetail_box">
                                <div className="content_top">
                                    <span>节点详情</span>
                                </div>
                                {
                                    nodeDetailMsgData != '' && (
                                        <div className="content_bottom">
                                            <div style={{marginBottom: '10px'}}><span>ID</span><span>{nodeDetailMsgData.PeerId}</span></div>
                                            <div style={{marginBottom: '10px'}}><span>矿工</span><span style={{color: '#1a4fc9'}} onClick={() => { this.props.history.push({ pathname: "/overview" }) }}>{nodeDetailMsgData.Miners}</span></div>
                                            <div style={{marginBottom: '10px'}}>
                                                <span>地区（公开IP）</span>
                                                <span>
                                            <span><img src={nodeDetailMsgData.Location.Flag} style={{width: '20px'}} /></span>
                                            <span>{nodeDetailMsgData.Location.ContinentName}-</span>
                                            <span>{nodeDetailMsgData.Location.CountryName}-</span>
                                            <span>{nodeDetailMsgData.Location.RegionName}-</span>
                                            <span>{nodeDetailMsgData.Location.City}</span>
                                            <span>{nodeDetailMsgData.Location.Ip}</span>
                                        </span>
                                            </div>
                                            <div style={{marginBottom: '10px'}}>
                                                <div style={{flex: '1'}}>
                                                    <span>MultiAddresses</span>
                                                </div>
                                                <div className="ip_content" style={{display: 'flex', flexDirection: 'column', flex: '1.5', alignItems: 'flex-start'}}>
                                                    {
                                                        nodeDetailMsgData.MultiAddresses.length > 0 && nodeDetailMsgData.MultiAddresses.map((item, index) => (
                                                            <span>{item}</span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
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
    nodeDetailMsgData: state.get('overview').get('nodeDetailMsgData')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleGetNodeDetail: (options) => {
        dispatch(actionCreator.handleGetNodeDetailAction(options))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetail)
