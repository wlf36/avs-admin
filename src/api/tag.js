import request from '@/utils/request'

export function getAllTag() {
  return request({
    url: `/getalltag`,
    method: 'get'
  })
}

export function fetchTags(params) {
  return request({
    url: '/tag',
    method: 'get',
    params
  })
}

export function removeTag(id) {
  return request({
    url: `/tag/${id}`,
    method: 'delete'
  })
}
