import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 注册
export default app => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
