
import axios from 'axios'

import { removeUsername } from 'util'

import { SERVER, API_CONFIG } from './config.js'
import { Toast } from 'antd-mobile'

const getApiObj = (apiConfig) => {
    const apiObj = {}

    for (let key in apiConfig) {
        apiObj[key] = (data) => {
            //处理请求参数
            let url = apiConfig[key][0] || ''
            // url = SERVER + url
            let method = apiConfig[key][1] || 'get'
            return request(url, method, data)
        }
    }
    return apiObj
}

const request = (url, method, data) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: method,
            url: url,
            withCredentials: true
        }
        switch (options.method.toUpperCase()) {
            case 'GET':
            case 'DELETE':
                options.params = data
                break
            default:
                options.data = data
        }
        Toast.loading('loading ... ', 0)
        axios(options)
            .then(result => {
                const data = result.data
                if (data.code == 101) {
                    removeUsername()
                    window.location.href = '/login'
                    reject('用户没有权限')
                } else {
                    resolve(data)
                }
                Toast.hide();
            })
            .catch(err => {
                reject(err)
                Toast.hide();
            })
    })
}


export default getApiObj(API_CONFIG)
