//左边栏页面
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { Button, Modal, Drawer, List, NavBar, Icon } from 'antd-mobile';
import "./index.css"
import { removeUsername } from 'util';

class HomeSider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routeList: [
                {
                    name: 'lotus部署',
                    path: '/'
                },
                {
                    name: 'lotus命令',
                    path: '/home'
                },
                {
                    name: 'lotusMiner',
                    path: '/lotusminer'
                },
                {
                    name: '资产管理',
                    path: '/serverManage'
                },
                {
                    name: '本地机器监控',
                    path: '/Monitor'
                },
                // {//暂时不需要打开
                //     name: '批量命令',
                //     path: '/ipssh'
                // },
                {
                    name: '组管理',
                    path: '/addgroup'
                },
                {
                    name: '分组批量命令',
                    path: '/grouping'
                }
            ],
            open: false,
            currentIndex: -1,
            isShowModal: false,
            backTopShow: false
        }

        this.onOpenChange = this.onOpenChange.bind(this)
        this.showModal = this.showModal.bind(this)
        this.onClose = this.onClose.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleAddAdmin = this.handleAddAdmin.bind(this)
        this.backTop = this.backTop.bind(this)
    }

    componentDidMount() {
        let menuBox = document.querySelector('.my-drawer')
        menuBox.style.display = 'none'
        window.addEventListener('scroll', () => {
            let scrollTop = document.documentElement.scrollTop || document.body / scrollTop;
            if (scrollTop > 500) {
                this.setState({
                    backTopShow: true
                })
            } else {
                this.setState({
                    backTopShow: false
                })
            }
        })
    }

    static getDerivedStateFromProps(props, state) {
        // console.log('123312----------', props.activeTxt);
        state.routeList.forEach((item, index) => {
            if (item.name == props.activeTxt) {
                // console.log('iindex----------', index);
                state.currentIndex = index
                return {
                    currentIndex: index,
                    open: props.open
                }
            }
        })
        return null
    }

    onOpenChange(args) {
        console.log(':::::::--------', args);
        this.setState({ open: !this.state.open }, () => {
            let menuBox = document.querySelector('.my-drawer')
            if (this.state.open) {
                // menuBox.setAttribute("class","am-drawer-open");
                menuBox.classList.add('am-drawer-open')
                menuBox.style.display = 'block'
            } else {
                menuBox.style.display = 'none'
            }
        });
    }

    showModal() {
        this.setState({
            isShowModal: true
        });
    }
    onClose() {
        this.setState({
            isShowModal: false
        });
    }
    handleLogout() {
        // 清除本地缓存用户信息
        removeUsername()
        //清除后回到登录页面
        window.location.href = '/login'
    }
    handleAddAdmin() { // 添加管理员函数
        removeUsername()
        window.location.href = '/register'
    }
    backTop() {
        // window.scrollTo(0, 0)
        let scrollToTop = window.setInterval(function () {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 50); // 每一步走多远
            } else {
                window.clearInterval(scrollToTop);
            }
        });

    }

    render() {
        const sidebar = (<List>
            {
                this.state.routeList.map((item, index) => {
                    if (index == 0) {
                        return (
                            <List.Item key={index} multipleLine style={{ marginTop: '45px' }}>
                                <NavLink className={this.state.currentIndex == index ? 'activeTxt' : 'routeTxt'} exact to={item.path}><Icon type="laptop" />{item.name}</NavLink>
                            </List.Item>
                        )
                    }
                    return (
                        <List.Item key={index}>
                            <NavLink className={this.state.currentIndex == index ? 'activeTxt' : 'routeTxt'} to={item.path}><Icon type="laptop" />{item.name}</NavLink>
                        </List.Item>
                    )

                })
            }
        </List>);


        return (
            <div>
                <div>
                    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '9999' }}>
                        <div className="clear_flot">
                            <NavBar
                                icon={<img src={require('../../../public/images/menu.png')} style={{ width: '25px' }} />}
                                onLeftClick={this.onOpenChange}
                                rightContent={<Icon type="ellipsis" onClick={this.showModal} />}>
                                {this.props.activeTxt}
                            </NavBar>
                        </div>
                    </div>
                    <Drawer
                        className="my-drawer"
                        style={{ minHeight: document.documentElement.clientHeight }}
                        enableDragHandle
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                        sidebar={sidebar}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}
                    >
                    </Drawer>
                    <Modal
                        popup
                        visible={this.state.isShowModal}
                        onClose={this.onClose}
                        animationType="slide-up"
                    >
                        <List className="popup-list">
                            <List.Item>
                                <Button type="primary" onClick={this.handleAddAdmin}>添加管理员</Button>
                            </List.Item>
                            <List.Item>
                                <Button onClick={this.handleLogout}>退出登录</Button>
                            </List.Item>
                        </List>
                    </Modal>
                    {
                        this.state.backTopShow
                        &&
                        <div className="backTop_wrap" onClick={this.backTop} aria-disabled={false}>
                            <img src={require("../../../public/images/cc-top.png")} style={{ width: '30px' }} alt="" />
                        </div>
                    }
                </div>
            </div>
        );
    }
}


export default HomeSider