const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userType: state => state.user.userType,
  account: state => state.user.account,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  permission_addRoutes: state => state.permission.addRoutes
}
export default getters
