import request from '../utils/request';

const BASE_SERVICE = '/plat-service';

/**
 * 登录接口
 * @param {*} payload 
 * @returns 
 */
export function login(payload) {
  return request.post(`${BASE_SERVICE}/login`, payload)
}

/**
 * 获取用户信息
 * @returns 
 */
export function getInfo() {
  return request.get(`${BASE_SERVICE}/getUserInfo`)
}

/**
 * 获取菜单信息
 * @returns 
 */
export function getMenus() {
  return request.get(`${BASE_SERVICE}/menu/sysmenu`)
}