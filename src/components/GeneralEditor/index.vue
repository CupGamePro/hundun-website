<template>
  <div>
    <VueEditor class="general-editor" :style="editStyle" v-model="content" :editorToolbar="customToolbar"
      :editorOptions="editorSettings" :placeholder="disabled ? '' : '请输入'" @text-change="onEditorChange"
      :disabled="disabled">
    </VueEditor>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import { ImageDrop } from 'quill-image-drop-module'
import QuillResize from 'quill-resize-module'
import defaultToolbar from './defaultToolBar'
import { addQuillTitle } from './quill-title.js'
import 'vue2-editor/dist/vue2-editor.css'

/* Import the Quill styles you want */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/resize', QuillResize)

export default {
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: String,
      default: '450px'
    },
    minHeight: {
      type: String,
      default: '240px'
    }
  },
  components: {
    VueEditor
  },
  watch: {
    theme () {
      this.changeTheme()
    }
  },
  mounted () {
    this.changeTheme()
    this.$nextTick(() => {
      addQuillTitle()
    })
  },
  data () {
    return {
      content: this.value,
      customToolbar: defaultToolbar,
      editorSettings: {
        modules: {
          imageDrop: true,
          resize: {
            modules: ['Resize', 'DisplaySize']
          },
          clipboard: {
            // 粘贴过滤
            matchers: [[Node.ELEMENT_NODE, this.HandleCustomMatcher]]
          }
        }
      },
      editStyle: {}
    }
  },
  methods: {
    onEditorChange () {
      this.$emit('input', this.content)
    },
    changeTheme () {
      this.editStyle = {
        '--height': this.height,
        '--maxHeight': this.maxHeight,
        '--minHeight': this.height ? this.height : this.minHeight,
      };
    },
    HandleCustomMatcher (node, Delta) {
      // 文字、图片等，从别处复制而来，清除自带样式，转为纯文本
      const ops = []
      Delta.ops.forEach(op => {
        if (op.insert) {
          ops.push({
            insert: op.insert
          })
        }
      })
      Delta.ops = ops
      return Delta
    }
  }
}
</script>

<style lang="scss">
.ql-container {
  overflow: hidden
}

.general-editor {
  .ql-editor {
    height: var(--height) !important;
    min-height: var(--minHeight) !important;
    max-height: var(--maxHeight) !important;
  }
    
}
</style>

<style>
/*滚动条整体样式*/
.ql-container ::-webkit-scrollbar {
  width: 6px; /*竖向滚动条的宽度*/
  height: 6px; /*横向滚动条的高度*/
}
.ql-container ::-webkit-scrollbar-thumb {
  /*滚动条里面的小方块*/
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.ql-container ::-webkit-scrollbar-track {
  /*滚动条轨道的样式*/
  background: #ccc;
  border-radius: 5px;
}
</style>
