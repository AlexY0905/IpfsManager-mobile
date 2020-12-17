import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    // 默认值里定义的属性名就是请求后台返回过来的数据里面的属性名
    monitorList: [],
    isLoading: false
})
// 以下action是从actionCreator.js里面 handleLtclistData()来到  payload参数想当于result
export default (state = defaultState, action) => {
    // 处理开始loading状态
    if (action.type == types.ISLOADING_START) {
        return state.merge({
            isLoading: true
        })
    }
    if (action.type == types.GET_MONITORLIST) {
        return state.merge({
            // action参数, 就是actionCreator.js中, 请求数据成功之后的.then函数中派发的action
            monitorList: fromJS(action.payload)// 将数据数组转换成immutable类型
        })
    }
    // 处理结束loading状态
    if (action.type == types.ISLOADING_END) {
        return state.merge({
            isLoading: false
        })
    }
    return state
}