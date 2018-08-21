import request from '@/utils/request'

export function getAllCategory() {
    return request({
        url: `/getallcategory`,
        method: 'get'
    })
}

export function fetchCategories() {
    return request({
        url: `/category`,
        method: 'get'
    })
}

export function fetchCategory(id) {
    return request({
        url: `/category/${id}`,
        method: 'get'
    })
}

export function createCategory(data) {
    return request({
        url: '/category',
        method: 'post',
        data
    })
}

export function updateCategory(id, data) {
    return request({
        url: `/category/${id}`,
        method: 'put',
        data
    })
}


export function removeCategory(id) {
    return request({
        url: `/category/${id}`,
        method: 'delete'
    })
}
