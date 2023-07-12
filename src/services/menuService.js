import request from '../utils/request';

const BASE_SERVICE = '/plat-service';

export function getIndex() {
  return request.get(`${BASE_SERVICE}/index`)
}

/**
 * @description: 菜单列表
 * @params {Pagination} pagination
 * @params {MListFilterItems} payload
 * @return {Promise}
 */
export function getMenuList({ page, size }) {
  return request.post(`${BASE_SERVICE}/menu/lists?page=${page}&size=${size}`)
}

/**
 * @description: 菜单新增
 * @params {MenuModelType} payload
 * @return {Promise}
 */
export function createMenu(payload) {
  return request.post(`${BASE_SERVICE}/menu/createMenu`, payload)
}

/**
 * @description: 菜单修改
 * @params {MenuModelType} payload
 * @return {Promise}
 */
export function updateMenu(payload) {
  return request.put(`${BASE_SERVICE}/menu/updateMenu`, payload)
}

/**
 * @description: 菜单删除
 * @params {string} id
 * @return {Promise}
 */
export function deleteMenu(id) {
  return request.delete(`${BASE_SERVICE}/menu/deleteMenu?id=${id}`)
}
