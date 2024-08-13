
import Axios from 'axios'
import router from '@/router/index'
import { userStoreHook } from "@/stores/modules/user";


const axiosInstance = Axios.create({
  timeout: 1000000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // baseURL: process.env.NODE_ENV === 'production' ? 'http://47.107.28.73:12345/api' :'/api'
  // baseURL: 'http://47.107.28.73:12345'
  baseURL: '/api'
})
axiosInstance.interceptors.request.use(async (config) => {
  config.headers["Authorization"] = userStoreHook().access_token || ''
  return config
})

axiosInstance.interceptors.response.use(async (response) => {
  if (response.data.code === 200) {
    return response.data
  } else if (response.data.code == 403) {
    router.replace('/login')
    userStoreHook().setAccessToken('')
    userStoreHook().setUserInfo({})
    ElMessage.error('请重新登录')
    return Promise.reject(response.data)
  } else {
    ElMessage.error(response.data.message)
    return Promise.reject(response.data)
  }
  // return response.data
})

const request = (
  method = 'get',
  url = '',
  param = {},
  axiosConfig = {},
  isLoading = true
) => {
  const config = {
    method,
    url,
    ...param,
    ...axiosConfig,
    isLoading
  }
  return new Promise((resolve, reject) => {
    axiosInstance.request(config).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default request