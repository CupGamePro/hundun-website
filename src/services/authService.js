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
