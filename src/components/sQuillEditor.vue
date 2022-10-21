<template>
  <quill-editor v-if="item.attrType===11" v-model="addForm[item.attrCode || item.attrName]" ref="myQuillEditor"
    :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
  </quill-editor>
</template>

<script>
  import { quillEditor, Quill } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import QuillResize from 'quill-resize-module';
import { ImageExtend } from 'quill-image-super-solution-module'
</script>