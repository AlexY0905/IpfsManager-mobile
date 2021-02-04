// lotusMiner页
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { List, SegmentedControl, Pagination, Icon } from 'antd-mobile';
import "./index.css"
import HomeSider from 'common/sider/index'
import { actionCreator } from './store'
import moment from "moment";

class HeightDetail extends Component {
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
        // 调用发送方函数, 处理获取区块高度数据列表
        let options = {
            name: 'minerblockinfo',
            height: this.props.location.state.parameter
        }
        this.props.handleBlockHeightData(options)
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
        let { blockHeightDataList } = this.props

        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="矿工概览" isBack={true} />
                    <div className="content" style={{ paddingTop: '45px', textAlign: 'left' }}>
                        <div className="heightDetail_wrap">
                            {
                                blockHeightDataList != '' && (
                                    <div className="heightDetail_box">
                                        <div className="content_top">
                                            <div className="box_top">
                                                <div style={{fontSize: '16px'}}>区块高度</div>
                                                <div>#{blockHeightDataList.Height}</div>
                                            </div>
                                            <div className="box_bottom">
                                                <div><span>区块时间</span><span>{moment.unix(blockHeightDataList.Timestamp).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                                                <div><span>累计消息数（去重）</span><span>{blockHeightDataList.MessageCount}</span></div>
                                            </div>
                                        </div>
                                        <div className="content_bottom">
                                            <div className="box_top">
                                                <div style={{fontSize: '16px'}}>所有区块</div>
                                            </div>
                                            <div className="box_bottom">
                                                {
                                                    blockHeightDataList.Blocks.length > 0 && blockHeightDataList.Blocks.map((item, index) => (
                                                        <div className="heightItem_wrap">
                                                            <div><span>区块ID</span><span onClick={ () => this.handleGoPage(item.Cid, 'blockDetailPage')}>{item.Cid}</span></div>
                                                            <div>
                                                                <span>矿工</span>
                                                                <div style={{flex: '1.5', display: 'flex'}}>
                                                                    <span style={{flex: '2.5', color: '#1a4fc9', textAlign: 'right', marginRight: '5px'}}>{item.Miner}</span>
                                                                    {
                                                                        item.MinerTag.Signed && (
                                                                            <span style={{background: '#F0F6FB', color: '#A0AEC0', padding: '5px', flex: 'auto', borderRadius: '30px', justifyContent: 'center', fontSize: '12px'}}>
                                                                                {item.MinerTag.Name}
                                                                                <span style={{flex: '0'}}>
                                                                                    <img src="https://filfox.info/dist/img/signed.16bca8b.svg" style={{width: '12px', marginLeft: '5px'}} />
                                                                                </span>
                                                                            </span>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div><span>奖励</span><span>{item.Reward}</span></div>
                                                            <div><span>消息数</span><span>{item.MessageCount}</span></div>
                                                        </div>
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
        )
    }
}
// 接收方
const mapStateToProps = (state) => ({
    // 获取属于home页面 store中的所有数据
    isLoading: state.get('overview').get('isLoading'),
    blockHeightDataList: state.get('overview').get('blockHeightDataList')
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    handleBlockHeightData: (options) => {
        dispatch(actionCreator.handleBlockHeightDataAction(options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeightDetail)
