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
