import request from '@/utils/request'

export function getAllTag() {
    return request({
        url: `/getalltag`,
        method: 'get'
    })
}

export function fetchTags() {
    return request({
        url: '/tag',
        method: 'get'
    })
}

export function removeTag(id) {
    return request({
        url: `/tag/${id}`,
        method: 'delete'
    })
}

export function fetchTag(id) {
    return request({
        url: `/tag/${id}`,
        method: 'get'
    })
}

export function createTag(data) {
    return request({
        url: '/tag',
        method: 'post',
        data
    })
}

export function updateTag(id, data) {
    return request({
        url: `/tag/${id}`,
        method: 'put',
        data
    })
}
