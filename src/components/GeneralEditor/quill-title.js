const titleConfig = {
  'ql-bold': '加粗',
  'ql-color': '字体颜色',
  'ql-font': '字体',
  'ql-code': '插入代码',
  'ql-italic': '斜体',
  'ql-link': '添加链接',
  'ql-background': '背景颜色',
  'ql-size': '字体大小',
  'ql-strike': '删除线',
  'ql-script': '上标/下标',
  'ql-underline': '下划线',
  'ql-blockquote': '引用',
  'ql-header': '标题',
  'ql-indent': '缩进',
  'ql-list': '列表',
  'ql-align': '文本对齐',
  'ql-direction': '文本方向',
  'ql-code-block': '代码块',
  'ql-formula': '公式',
  'ql-image': '图片',
  'ql-video': '视频',
  'ql-clean': '清除字体样式'
 };

 export function addQuillTitle() {
  const oToolBar = document.getElementsByClassName('ql-toolbar')
  if (oToolBar && oToolBar.length) {
    const toolBars = Array.from(oToolBar)
    toolBars.forEach(bar => {
      const aButton = bar.querySelectorAll('button');
      const aPick = bar.querySelectorAll('.ql-picker');
      // [0].className
      if (aButton.length) {
        aButton.forEach(item => {
          if (item.className === 'ql-script') {
            item.value === 'sub' ? item.title = '下标' : item.title = '上标';
          } else if (item.className === 'ql-indent') {
            item.value === '+1' ? item.title = '向右缩进' : item.title = '向左缩进';
          } else if (item.className === 'ql-align') {
            if (item.value === 'center') {
              item.title = '居中对齐'
            } else if (item.value === 'right') {
              item.title = '右对齐'
            } else if (item.value === 'justify') {
              item.title = '两端对齐'
            } else {
              item.title = '左对齐'
            }
          } else if (item.className === 'ql-list') {
            if (item.value === 'ordered') {
              item.title = '插入编号'
            } else if (item.value === 'check') {
              item.title = '插入复选框'
            } else if (item.value === 'bullet') {
              item.title = '插入项目符号'
            } else {
              item.title = '列表样式'
            }
          } else {
            item.title = titleConfig[item.classList[0]];
          }
        });
      }
      if (aPick.length) {
        aPick.forEach(item => {
          if (item.className.indexOf('ql-header') > -1) {
            item.title = titleConfig['ql-header'];
          } else if (item.className.indexOf('ql-background') > -1) {
            item.title = titleConfig['ql-background'];
          } else if (item.className.indexOf('ql-color') > -1) {
            item.title = titleConfig['ql-color'];
          }
        })
      }
    })
  }
}