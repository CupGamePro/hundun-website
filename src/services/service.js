import request from '../utils/request';

const BASE_SERVICE = '/plat-service';

/**
 * @description: 服务列表
 * @return {Promise}
 */
export function getServiceList(payload) {
  return request.post(`${BASE_SERVICE}/plat/list`, payload)
}


/**
 * @description: 初始化服务
 * @return {Promise}
 */
export function initService(payload) {
  return request.get(`${BASE_SERVICE}/plat/github/org/${payload}/repos`,{
    timeout: 50000 // 设置浏览器请求超时时间
  })
}

/**
 * @description: 服务删除
 * @params {string} uuid
 * @return {Promise}
 */
export function deleteService(uuid) {
  return request.delete(`${BASE_SERVICE}/plat/${uuid}`)
}