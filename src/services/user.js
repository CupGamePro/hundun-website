import request from '../utils/request';

const BASE_SERVICE = '/plat-service';

/**
 * @description: 用户分类列表
 * @return {Promise}
 */
export function getCatalogs() {
  return request.get(`${BASE_SERVICE}/users/catalogs`)
}

/**
 * @description: 用户列表
 * @params {Pagination} pagination
 * @params {MListFilterItems} payload
 * @return {Promise}
 */
export function getUserList(payload) {
  return request.post(`${BASE_SERVICE}/users/list`, payload)
}

/**
 * @description: 用户新增
 * @params {UserModelType} payload
 * @return {Promise}
 */
export function createUser(payload) {
  return request.post(`${BASE_SERVICE}/users/create`, payload)
}

/**
 * @description: 用户修改
 * @params {UserModelType} payload
 * @return {Promise}
 */
export function updateUser(payload) {
  return request.patch(`${BASE_SERVICE}/users`, payload)
}

/**
 * @description: 用户状态修改
 * @params {UserModelType} payload
 * @return {Promise}
 */
export function updateStatus(uuid, status) {
  return request.patch(`${BASE_SERVICE}/users/updateStatus/${uuid}?status=${status}`)
}

/**
 * @description: 用户删除
 * @params {string} id
 * @return {Promise}
 */
export function deleteUser(uuid) {
  return request.delete(`${BASE_SERVICE}/users/${uuid}`)
}
