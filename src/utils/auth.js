import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove('admin_name')
  Cookies.remove('admin_avatar')
  Cookies.remove('admin_userType')
  Cookies.remove('admin_roles')
  Cookies.remove('admin_account')
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get('admin_name')
}

export function setName(name) {
  return Cookies.set('admin_name', name)
}
export function getAvatar() {
  return Cookies.get('admin_avatar')
}

export function setAvatar(name) {
  return Cookies.set('admin_avatar', name)
}
export function getUserType() {
  return Cookies.get('admin_userType')
}

export function setUserType(name) {
  return Cookies.set('admin_userType', name)
}
export function getRoles() {
  return Cookies.get('admin_roles')
}

export function setRoles(name) {
  return Cookies.set('admin_roles', name)
}

export function getAccount() {
  return Cookies.get('admin_account')
}

export function setAccount(name) {
  return Cookies.set('admin_account', name)
}
