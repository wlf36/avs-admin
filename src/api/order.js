import request from '@/utils/request'

export function fetchOrders(params) {
    return request({
        url: `/order`,
        method: 'get',
        params
    })
}
