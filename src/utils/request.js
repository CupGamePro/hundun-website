import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 3000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  },
});

// 请求拦截
service.interceptors.request.use(
  (config) => {

    // @ts-ignore
    config.headers['Content-Type'] = 'application/json';

    // 模拟请求令牌
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      ElMessage.error(res.message || 'Error');
    } else {
      return res;
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
    }
  }
)

export default service;
