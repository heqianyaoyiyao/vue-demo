import request from "../request"

// 登录
export const login = (data?: object):any => {
  return request("post", "/users/login", { data });
}

// 登出
export const logout = ():any => {
  return request("post", "/users/logout");
}

// 注册
export const regist = (data?: object):any => {
  return request("post", "/users/regist", { data })
}

// 获取重置密码的token
export const getResetPasswordToken = (params?: object):any => {
  return request("get", "/users/getResetPasswordToken", { params })
}

// 重置密码
export const resetPassword = (data?: object):any => {
  return request("post", "/users/resetPassword", { data })
}

// 检查token是否有效
export const checkToken = ():any => {
  return request("get", "/users/checkToken")
}