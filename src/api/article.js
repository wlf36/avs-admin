import request from '@/utils/request'

export function fetchHosp(){
  return request({
    url: '/hosp',
    method: 'get'  
  })
}

//banner
export function fetchBanners(params) {
  return request({
    url: '/banner',
    method: 'get',
    params
  })
}

export function fetchBanner(hosp_id){
  return request({
    url: `/banner/${hosp_id}`,
    method: 'get'  
  })
}

export function createBanner(data) {
  return request({
    url: '/banner',
    method: 'post',
    data
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

//result
export function fetchResults(params) {
  return request({
    url: '/result',
    method: 'get',
    params
  })
}

export function createResult(data) {
  return request({
    url: '/result',
    method: 'post',
    data
  })
}

export function fetchResult(id) {
  return request({
    url: `/result/${id}`,
    method: 'get'
  })
}

export function updateResult(id,data) {
  return request({
    url: `/result/${id}`,
    method: 'put',
    data
  })
}

export function removeResult(id) {
  return request({
    url: `/result/${id}`,
    method: 'delete'
  })
}


//ad
export function getAd(params) {
  return request({
    url: '/ad',
    method: 'get',
    params
  })
}

export function createAd(data) {
  return request({
    url: '/ad',
    method: 'post',
    data
  })
}

export function fetchAd(id) {
  return request({
    url: `/ad/${id}`,
    method: 'get'
  })
}

export function updateAd(id,data) {
  return request({
    url: `/ad/${id}`,
    method: 'put',
    data
  })
}

export function removeAd(id) {
  return request({
    url: `/ad/${id}`,
    method: 'delete'
  })
}

//relation
export function fetchRelations(params) {
  return request({
    url: '/relation',
    method: 'get',
    params
  })
}

export function fetchRelation(hosp_id){
  return request({
    url: `/relation/${hosp_id}`,
    method: 'get'  
  })
}

export function createRelation(data) {
  return request({
    url: '/relation',
    method: 'post',
    data
  })
}

export function updateRelation(id,data) {
  return request({
    url: `/relation/${id}`,
    method: 'put',
    data
  })
}

export function removeRelation(id) {
  return request({
    url: `/relation/${id}`,
    method: 'delete'
  })
}

//file
export function removeFile(id) {
  return request({
    url: `/file/${id}`,
    method: 'delete'
  })
}




