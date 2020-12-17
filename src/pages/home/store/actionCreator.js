import * as types from './actionTypes.js'
import api from 'api/index'
import { Toast } from 'antd-mobile'

// 处理loading状态开始
const getIsLoadingStart = () => ({
    type: types.ISLOADING_START
})
// 处理loading状态结束
const getIsLoadingEnd = () => ({
    type: types.ISLOADING_END
})
const handleLotusOrdersData = (payload) => ({
    type: types.GET_LOTUSORDERLIST,
    payload: payload
})
export const handleLotusOrdersAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getLotusOrders(options)
            .then((result) => {
                console.log('::::::::-------', result)
                // return
                if (result.code == 1) {
                    Toast.fail('没有数据, 请稍后再试 !')
                    return false
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleLotusOrdersData(result))
                }
            })
            .catch((err) => {
                Toast.fail('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理搜索函数
export const handleSearchAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getSearchData(options)
            .then((result) => {
                console.log('::::::::-------', result)
                if (result.code == 1) {
                    Toast.fail('没有数据, 请稍后再试 !')
                    return false
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleLotusOrdersData(result))
                }
            })
            .catch((err) => {
                Toast.fail('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
