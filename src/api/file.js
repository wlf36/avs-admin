import request from '@/utils/request'

//file
export function removeFile(id) {
  return request({
    url: `/image/${id}`,
    method: 'delete'
  })
}




