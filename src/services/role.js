import request from '../utils/request';

const BASE_SERVICE = '/plat-service';

/**
 * @description: 角色分类列表
 * @return {Promise}
 */
export function getCatalogs() {
  return request.get(`${BASE_SERVICE}/role/catalogs`)
}

/**
 * @description: 角色列表
 * @params {Pagination} pagination
 * @params {MListFilterItems} payload
 * @return {Promise}
 */
export function getRoleList(payload) {
  return request.post(`${BASE_SERVICE}/roles/list`, payload)
}

/**
 * @description: 角色列表不分页
 * @return {Promise} 
 */
export function findAllByNoPage() {
  return request.get(`${BASE_SERVICE}/roles/findAllByNoPage`)
}

/**
 * @description: 角色新增
 * @params {RoleModelType} payload
 * @return {Promise}
 */
export function createRole(payload) {
  return request.post(`${BASE_SERVICE}/roles/create`, payload)
}

/**
 * @description: 角色修改
 * @params {RoleModelType} payload
 * @return {Promise}
 */
export function updateRole(payload) {
  return request.patch(`${BASE_SERVICE}/roles`, payload)
}

/**
 * @description: 角色状态修改
 * @params {RoleModelType} payload
 * @return {Promise}
 */
export function updateStatus(uuid, status) {
  return request.patch(`${BASE_SERVICE}/roles/updateStatus/${uuid}?status=${status}`)
}

/**
 * @description: 角色删除
 * @params {string} id
 * @return {Promise}
 */
export function deleteRole(uuid) {
  return request.delete(`${BASE_SERVICE}/roles/${uuid}`)
}

/**
 * @description: 获取权限树
 * @return {Promise}
 */
export function getAuthTree() {
  const params = {
    hasAuth: true
  }
  return request.post(`${BASE_SERVICE}/roles/authTree`, params)
}

/**
 * @description: 权限授权
 * @params {RoleModelType} payload
 * @return {Promise}
 */
export function powerAuth(payload) {
  return request.post(`${BASE_SERVICE}/roles/powerAuth`, payload)
}

/**
 * @description: 获取当前角色权限
 * @params {string} uuid
 * @return {Promise}
 */
export function getAuthByRole(uuid) {
  return request.get(`${BASE_SERVICE}/roles/getAuthByRole/${uuid}`)
}
