// 本地机器监控页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeSider from "common/sider";
import {Button, Drawer, List, NavBar, Icon, Accordion, Progress} from 'antd-mobile';
import "./index.css"
import { actionCreator } from './store'



class Monitor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            state: false
        }
        this.onOpenChange = this.onOpenChange.bind(this)

    }
    componentDidMount() {
        // 在生命周期调用发送方的数据
        this.props.handleGetMonitorList()
        setInterval(() => {//定时器  每12秒更新一次
            this.props.handleGetMonitorList()
        }, 12000)
    }
    onOpenChange (args) {
        console.log(':::::::--------', args);
        this.setState({ open: !this.state.open });
    }



    render() {
        let { monitorList } = this.props
        let monitorDataList = monitorList.toJS().map((item, index) => {
            return (
                <Accordion defaultActiveKey="0" className="my-accordion">
                    <Accordion.Panel header={`IP ${item.ip}`}>
                        <List className="my-list">
                            <List.Item><span>hostname : </span><span>{item.hostname}</span></List.Item>
                            <List.Item><span>machineType : </span><span>{item.machineType}</span></List.Item>
                            <List.Item><span>ip : </span><span>{item.ip}</span></List.Item>
                            <List.Item><span>cpu_detail : </span><span>{item.cpu_detail}</span></List.Item>
                            <List.Item className="rate_wrap"><span>gpuRate : </span><span className="progress_wrap"><Progress percent={item.gpuRate} position="normal" appearTransition /><span className="rate_num">{item.gpuRate} %</span></span></List.Item>
                            <List.Item className="rate_wrap"><span>cpuRate : </span><span className="progress_wrap"><Progress percent={item.cpuRate} position="normal" appearTransition /><span className="rate_num">{item.cpuRate} %</span></span></List.Item>
                            <List.Item className="rate_wrap"><span>memRate : </span><span className="progress_wrap"><Progress percent={item.memRate} position="normal" appearTransition /><span className="rate_num">{item.memRate} %</span></span></List.Item>
                            <List.Item><span>light : </span><span>{item.light}</span></List.Item>
                            <List.Item><span>networkPort : </span><span>{item.networkPort  == 0 ? '千兆网口' : '万兆网口'}</span></List.Item>
                            <List.Item><span>run : </span><span>{item.run == 0 ? '无运行' : '运行'}</span></List.Item>
                            <List.Item><span>mem : </span><span>{item.mem}</span></List.Item>
                            <List.Item><span>gpu : </span><span>{item.gpu}</span></List.Item>
                        </List>
                    </Accordion.Panel>
                </Accordion>
            )
        })
        return (
            <div>
                <div style={{overflow: 'hidden',padding: '0', margin: '0'}}>
                    <HomeSider open={this.state.open} activeTxt="本地机器监控" />
                    <div className="content" style={{paddingTop: '50px'}}>
                        <div style={{ padding: '0 5px' }}>
                            {
                                monitorDataList.length > 0 && monitorDataList
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
    // 获取属于monitor页面 store中的所有数据
    monitorList: state.get('monitor').get('monitorList'),
    isLoading: state.get("monitor").get("isLoading")
})
// 发送方
const mapDispatchToProps = (dispatch) => ({
    // （handleGetMonitorList）自定义这个函数名 用这个函数名派发action
    handleGetMonitorList: () => {
        dispatch(actionCreator.handleGetMonitorListAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)
