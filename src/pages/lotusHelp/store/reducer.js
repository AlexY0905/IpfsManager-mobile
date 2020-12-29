import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    // 默认值里定义的属性名就是请求后台返回过来的数据里面的属性名
    serverhostlist: [],
    isLoading: false,
    deployMsg: [],
    name: ''
})
// 以下action是从actionCreator.js里面 handleLtclistData()来到  payload参数想当于result
export default (state = defaultState, action) => {
    // 处理开始loading状态
    if (action.type == types.ISLOADING_START) {
        return state.merge({
            isLoading: true
        })
    }
    // 处理结束loading状态
    if (action.type == types.ISLOADING_END) {
        return state.merge({
            isLoading: false
        })
    }
    // 处理展示服务器功能
    if (action.type == types.GET_SERVERHOSTLIST) {
        return state.merge({
            // action参数, 就是actionCreator.js中, 请求数据成功之后的.then函数中派发的action
            serverhostlist: fromJS(action.payload)// 将数据数组转换成immutable
        })
    }
    // 处理部署操作
    if (action.type == types.GET_DEPLOY) {
        return state.merge({
            deployMsg: fromJS(action.payload.msg), // 将数据数组转换成immutable
            name: action.payload.name
        })
    }
    // 处理查询操作的返回结果
    if (action.type == types.GET_QUERYRES) {
        return state.merge({
            deployMsg: action.payload.msg,
            name: action.payload.name
        })
    }

    return state
}