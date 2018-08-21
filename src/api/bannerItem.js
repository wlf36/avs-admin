import request from '@/utils/request'

export function fetchBannerItems(id) {
    return request({
        url: `/getbanneritems/${id}`,
        method: 'get',
    })
}

export function createBannerItem(data) {
    return request({
        url: '/banneritem',
        method: 'post',
        data
    })
}

export function fetchBannerItem(id) {
    return request({
        url: `/banneritem/${id}`,
        method: 'get'
    })
}

export function updateBannerItem(id, data) {
    return request({
        url: `/banneritem/${id}`,
        method: 'put',
        data
    })
}

export function removeBannerItem(id) {
    return request({
        url: `/banneritem/${id}`,
        method: 'delete'
    })
}
