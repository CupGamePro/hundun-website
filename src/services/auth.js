import request from '../utils/request';

const BASE_SERVICE = '/plat-service';

/**
 * 获取权限树
 * @param {*} payload 
 * @returns 
 */
export function getTreeList() {
  return request.get(`${BASE_SERVICE}/auth/tree/list`)
}

/**
 * 获取权限列表
 * @param {*} payload 
 * @returns 
 */
export function getTableList(payload) {
  return request.post(`${BASE_SERVICE}/auth/list`, payload)
}

/**
 * @description: 权限新增
 * @params {RoleModelType} payload
 * @return {Promise}
 */
export function createAuth(payload) {
  return request.post(`${BASE_SERVICE}/auth/create`, payload)
}

/**
 * @description: 权限修改
 * @params {RoleModelType} payload
 * @return {Promise}
 */
export function updateAuth(payload) {
  return request.patch(`${BASE_SERVICE}/auth`, payload)
}

/**
 * @description: 删除
 * @params {string} id
 * @return {Promise}
 */
export function deleteAuth(uuid) {
  return request.delete(`${BASE_SERVICE}/auth/${uuid}`)
}
