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
const handleMinerlistData = (payload) => ({
    type: types.GET_MINERLIST,
    payload: payload
})
export const handleMinerlistAction = () => {
    return (dispatch, getState) => {
        dispatch(getIsLoadingStart())
        api.minerList()
            .then((result) => {
                console.log(result);
                if (result.code == 0) {
                    let data = result.data
                    return
                    // 将后台请求过来的成功数据, 派发action, 到store
                    dispatch(handleMinerlistData(data))
                } else {
                    Toast.fail(result.msg)
                }
            })
            .catch((err) => {
                Toast.fail('获取数据失败,请稍后再试')
            })
            .finally(() => {
                dispatch(getIsLoadingEnd())
            })
    }
}