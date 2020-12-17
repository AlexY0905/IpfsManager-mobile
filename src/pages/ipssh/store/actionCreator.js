import * as types from './actionTypes.js'
import api from 'api'
import { Toast } from 'antd-mobile'


// 处理loading状态开始
const getIsLoadingStart = () => ({
    type: types.ISLOADING_START
})
// 处理loading状态结束
const getIsLoadingEnd = () => ({
    type: types.ISLOADING_END
})
// 处理批量命令页面 获取所有服务器数据列表
const handleGetServerHostData = (payload) => ({
    type: types.GET_SERVERHOSTLIST,
    payload: payload
})
// 处理批量命令页面 获取所有服务器数据列表
export const handleGetServerHostDataAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getAllServer()
            .then(result => {
                console.log(':::::::::::::::', result)
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

// 处理批量命令页面 批量命令服务器
const handleIpSshData = (payload) => ({
    type: types.GET_IPSSH,
    payload: payload
})
// 处理批量命令页面 批量命令服务器
export const handleIpSshAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getIpSsh(options)
            .then(result => {
                // console.log(':::::::::::::::', result)
                let data = result.msg
                dispatch(handleIpSshData(data))
            })
            .catch(err => {
                Toast.fail('操作失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}

// 处理批量命令页面 上传文件
export const handleUpLoadFileAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.uploadfile(options)
            .then(result => {
                console.log(':::::::::::::::', result)
                let data = result.msg
                dispatch(handleIpSshData(data))
            })
            .catch(err => {
                Toast.fail('操作失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}

// 处理批量命令页面 下载文件
export const handleDownFileAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.downloadfile(options)
            .then(result => {
                // console.log(':::::::::::::::', result)
                if (result.msg == 'success') {
                    Toast.success('下载成功')
                } else {
                    Toast.fail('下载失败, 请稍后再试 !')
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