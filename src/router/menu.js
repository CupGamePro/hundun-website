export const menus = [
  {
    path: '/home',
    name: 'Home',
    title: 'Dashboard',
    icon: 'Drizzling'
  },
  {
    path: '/authority',
    name: 'Authority',
    title: '系统管理',
    icon: 'Drizzling',
    children: [
      {
        path: '/authority/menu',
        name: 'Menu',
        title: '菜单管理',
        icon: 'Bowl'
      },
      {
        path: '/authority/users',
        name: 'Users',
        title: '用户列表',
        icon: 'Bowl'
      },
      {
        path: '/authority/roles',
        name: 'Roles',
        title: '角色列表',
        icon: 'Bowl'
      },
      {
        path: '/authority/resource',
        name: 'Resource',
        title: '资源列表',
        icon: 'Bowl'
      }
    ]
  }
]
