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
// 处理添加组页面 获取所有服务器数据列表
const handleGetServerHostData = (payload) => ({
    type: types.GET_SERVERHOSTLIST,
    payload: payload
})
// 处理添加组页面 获取所有服务器数据列表
export const handleGetServerHostDataAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getAllServer()
            .then(result => {
                // console.log(':::::::::::::::', result)
                dispatch(handleGetServerHostData(result))
            })
            .catch(err => {
                Toast.fail('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理部署页面 部署操作
const handleDeployData = (payload) => ({
    type: types.GET_DEPLOY,
    payload: payload
})
// 处理部署页面 部署操作
export const handleDeployAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getDeploy(options)
            .then(result => {
                console.log(':::::::::::::::', result)
                if (result.code == 0) {
                    dispatch(handleDeployData(result))
                } else {
                    Toast.fail('操作失败, 请稍后再试 !')
                }
            })
            .catch(err => {
                Toast.fail('操作失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
// 处理部署页面 定时查询操作的返回结果
const handleGetQueryResData = (payload) => ({
    type: types.GET_QUERYRES,
    payload
})
// 处理部署页面 定时查询操作的返回结果
export const handleGetQueryResAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getQueryRes(options)
            .then(result => {
                console.log('result----------', result)
                if (result.code == 0) { // 全部执行完毕, 并且成功
                    dispatch(handleGetQueryResData(result))
                } else if (result.code == 1) { // 正在执行中
                    dispatch(handleGetQueryResData(result))
                } else if (result.code == 4) { // 暂无可查询的指令
                    Toast.fail(result.msg)
                    return false
                } else if (result.code == 2) { // 执行失败 网络错误
                    Toast.fail('网络错误, 请稍后再试 !')
                    dispatch(handleGetQueryResData(result))
                    return false
                }
            })
            .catch(err => {
                Toast.fail('网络错误, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}

// 处理部署页面 文件上传
export const handleUpLoadAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.scriptFileUpLoad(options)
            .then(result => {
                console.log('result----------', result)
                if (result.code == 0) { // 文件上传成功
                    Toast.success('上传成功')
                    return false
                } else if (result.code == 1) { // 文件上传失败
                    Toast.fail(`${result.name.join(',')} 上传失败`)
                    return false
                } else if (result.code == 2) { // 配置文件不存在
                    Toast.fail(`配置文件不存在`)
                    return false
                } else if (result.code == 3) { // 配置文件不正确
                    Toast.fail(`配置文件不正确`)
                    return false
                }
            })
            .catch(err => {
                Toast.fail('网络错误, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}
