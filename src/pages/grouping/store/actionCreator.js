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
// 处理添加组页面 获取所有组数据列表
const handleGetGroupListData = (payload) => ({
    type: types.GET_GROUPLIST,
    payload: payload
})
// 处理添加组页面 获取所有组数据列表
export const handleGetGroupListAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.getGroupList()
            .then(result => {
                console.log(':::::::::::::::------', result)
                if (result.code == 0) {
                    let data = result.msg == null ? [] : result.msg
                    dispatch(handleGetGroupListData(data))
                } else {
                    Toast.fail("获取数据失败, 请稍后再试 !")
                }
            })
            .catch(err => {
                Toast.fail('获取数据失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}

// 处理分组批量命令页面 批量命令服务器
const handleIpSshData = (payload) => ({
    type: types.GET_IPSSH,
    payload: payload
})
// 处理分组批量命令页面 批量命令服务器
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

// 处理分组批量命令页面 上传文件
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

// 处理分组批量命令页面 下载文件
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

// 分组批量命令页面, 处理本地文件上传
export const handleUpLoadAction = (options) => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.localFileUpLoad(options)
            .then(result => {
                console.log('result----------', result)
                return false
                if (result.code == 0) {
                    Toast.success(`${result.name} 上传成功`)
                    return false
                } else {
                    Toast.fail(`${result.name} 上传失败`)
                    return false
                }
            })
            .catch(err => {
                message.error('查询结果失败, 请稍后再试 !')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}