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

        }

    }

    componentDidMount() {
        // 在生命周期调用发送方的数据


    }


    render() {
        let { name, type, lotusOrderList } = this.props
        let { modalType } = this.state

        return (
            <div>
                <div style={{ overflow: 'hidden', padding: '0', margin: '0' }}>
                    <HomeSider open={this.state.open} activeTxt="lotusMiner" />
                    <div className="content" style={{ marginTop: '100px' }}>
                        欢迎来到lotusMiner页面
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

})
// 发送方
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LotusHelp)
