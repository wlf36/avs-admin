import request from '@/utils/request'

export function fetchUsers() {
    return request({
        url: '/user',
        method: 'get'
    })
}

export function fetchUserInfo() {
    return request({
        url: `/user/info`,
        method: 'get'
    })
}

export function updatePassword(data) {
    return request({
        url: '/user/password',
        method: 'put',
        data
    })
}
