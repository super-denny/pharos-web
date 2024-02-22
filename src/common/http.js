// 导入封装好的Axios
import {request} from './request' //注意request.js的相对路径问题

// post请求
export function post(url, data) {
    return request({
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('loginToken')
        },
        method: 'post',
        data: data
    })
}

export function get(url, data) {
    return request({
        url: url,
        headers: {
            'token': localStorage.getItem('loginToken')
        },
        method: 'get',
        params: data
    })
}
