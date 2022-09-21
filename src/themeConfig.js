export const ThemeConfig = {
  // 主题色
  PrimaryColor: "#b37feb",
  DangerColor: "#f56c6c",

  // title
  title: "Cup Games Pro",

  // 头部栏高度
  HeaderHeight: '48px',

  // 侧栏展开宽度
  SlideMenuWidth: '200px',

  // 侧栏关闭宽度
  SlideMenuMinWidth: 'calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)',

  // 是否显示页签菜单
  isTagsMenu: true,
};

document.title = ThemeConfig.title;

export default ThemeConfig;
