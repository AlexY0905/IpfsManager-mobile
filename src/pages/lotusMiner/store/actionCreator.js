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
const handleLotusMinerData = (payload) => ({
    type: types.GET_LOTUSMINERLIST,
    payload: payload
})
export const handleLotusMinerAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getLotusMiner(options)
            .then((result) => {
                console.log('::::::::-------', result)
                if (result.code == 1) {
                    Toast.fail('暂无数据, 请稍后再试 !')
                    return false
                } else {
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleLotusMinerData(result))
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
// 处理搜索
export const handleSearchAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getSearchData(options)
            .then((result) => {
                // console.log('result---------', result)
                // 将后台请求过来的成功数据, 派发action, 到store
                dispatch(handleLotusMinerData(result))
            })
            .catch((err) => {
                Toast.fail('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理minerInfo数据
const handleMinerInfoData = (payload) => ({
    type: types.GET_LOTUSMINERINFO,
    payload: payload
})
export const handleMinerInfoAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getMinerInfoData()
            .then((result) => {
                console.log('result---------', result)
                let data = []
                for (let key in result.msg) {
                    data.push({[key]: result.msg[key]})
                }
                dispatch(handleMinerInfoData(data))
            })
            .catch((err) => {
                message.error('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}