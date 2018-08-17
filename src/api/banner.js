import request from '@/utils/request'

//banner
export function fetchBanners(params) {
  return request({
    url: '/banner',
    method: 'get',
    params
  })
}

export function createBanner(data) {
  return request({
    url: '/banner',
    method: 'post',
    data
  })
}

export function fetchBanner(id) {
  return request({
    url: `/banner/${id}`,
    method: 'get'
  })
}

export function updateBanner(id,data) {
  return request({
    url: `/banner/${id}`,
    method: 'put',
    data
  })
}

export function removeBanner(id) {
  return request({
    url: `/banner/${id}`,
    method: 'delete'
  })
}