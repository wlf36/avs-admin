import request from '@/utils/request'

export function fetchVocabularies(params) {
  return request({
    url: '/vocabulary',
    method: 'get',
    params
  })
}

export function fetchVocabulary(id){
  return request({
    url: `/vocabulary/${id}`,
    method: 'get'  
  })
}

export function createVocabulary(data) {
  return request({
    url: '/vocabulary',
    method: 'post',
    data
  })
}

export function updateVocabulary(id,data) {
  return request({
    url: `/vocabulary/${id}`,
    method: 'put',
    data
  })
}

export function removeVocabulary(id) {
  return request({
    url: `/vocabulary/${id}`,
    method: 'delete'
  })
}