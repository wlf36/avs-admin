import request from '@/utils/request'

export function removeCategory(id, data) {
  return request({
    url: `/product/${id}/removecat`,    
    method: 'delete',
    data   
  })
}

export function removeTag(id, data) {
  return request({
    url: `/product/${id}/removetag`,    
    method: 'delete',
    data   
  })
}

export function fetchProducts() {
  return request({
    url: `/product`,
    method: 'get'  
  })
}

export function fetchProduct(id) {
  return request({
    url: `/product/${id}`,
    method: 'get'  
  })
}

export function createProduct(data) {
  return request({
    url: '/product',
    method: 'post',
    data
  })
}

export function updateProduct(id, data) {
  return request({
    url: `/product/${id}`,
    method: 'put',
    data
  })
}

export function removeProduct(id) {
  return request({
    url: `/product/${id}`,
    method: 'delete'
  })
}