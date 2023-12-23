import request from '../utils/request';

const BASE_SERVICE = '/plat-service';

/**
 * @description: 菜单分类列表
 * @return {Promise}
 */
export function getCatalogs() {
  return request.get(`${BASE_SERVICE}/menu/catalogs`)
}

/**
 * @description: 菜单列表
 * @params {Pagination} pagination
 * @params {MListFilterItems} payload
 * @return {Promise}
 */
export function getMenuList(payload) {
  return request.post(`${BASE_SERVICE}/menu/list`, payload)
}

/**
 * @description: 菜单新增
 * @params {MenuModelType} payload
 * @return {Promise}
 */
export function createMenu(payload) {
  return request.post(`${BASE_SERVICE}/menu/create`, payload)
}

/**
 * @description: 菜单修改
 * @params {MenuModelType} payload
 * @return {Promise}
 */
export function updateMenu(payload) {
  return request.patch(`${BASE_SERVICE}/menu`, payload)
}

/**
 * @description: 菜单状态修改
 * @params {MenuModelType} payload
 * @return {Promise}
 */
export function updateStatus(uuid, status) {
  return request.patch(`${BASE_SERVICE}/menu/updateStatus/${uuid}?status=${status}`)
}

/**
 * @description: 菜单删除
 * @params {string} id
 * @return {Promise}
 */
export function deleteMenu(uuid) {
  return request.delete(`${BASE_SERVICE}/menu/${uuid}`)
}
