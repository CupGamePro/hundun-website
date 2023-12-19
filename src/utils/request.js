import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '../router'

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

    //从本地存储中获取Token
    const token = localStorage.getItem('token');
    if (token) {
      //在请求头中携带Token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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
      if( response.data.code === 401) {
        ElMessage.error('登录已过期，请重新登录');
        router.push('/login')
      } else {
        ElMessage.error(response.data.message || 'Error');
        return Promise.reject(response.data);
      }
    } else {

      ElMessage.error(error.message || 'Error');
      return Promise.reject(error);
    }
  }
)

export default service;
