<template>
  <div style="border: 1px solid #ccc" v-if="flag">
    <!-- 工具栏 -->
    <Toolbar
      :editorId="editorId"
      :defaultConfig="toolbarConfig"
      style="border-bottom: 1px solid #ccc"
    />
    <!-- 编辑器 -->
    <Editor
      :editorId="editorId"
      :defaultConfig="editorConfig"
      :defaultContent="getDefaultContent"
      @onChange="handleChange"
      @customPaste="customPaste"
      style="height: 200px"
    />
  </div>
</template>
<script setup>
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'

import cloneDeep from 'lodash/cloneDeep'
import '@wangeditor/editor/dist/css/style.css'

const props = defineProps({
  contentHtml: {
    type: String,
    default: ''
  },
  contentCss: {
    type: String,
    default: ''
  },
  flag: {
    type: Boolean,
    default: false
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:contentHtml', 'update:contentCss'])
const { contentCss, flag, readOnly } = toRefs(props)
console.log(readOnly.value)
// 编辑将默认显示的内容
// const defaultContent = ref([])
// watch(content, () => {
//   defaultContent.value = []
//   defaultContent.value = [
//     {
//       type: 'paragraph',
//       children: [{ text: content.value }]
//     }
//   ]
//   console.log(defaultContent.value)
// })

// 定义一个编辑器 id ，要求：全局唯一且不变！！！
const editorId = 'wangeEditor-1'

// 工具栏配置
const toolbarConfig = {
  toolbarKeys: [
    'blockquote',
    'header1',
    'header2',
    'header3',
    '|',
    'bold',
    'underline',
    'italic',
    'through',
    'color',
    'bgColor',
    'clearStyle',
    '|',
    'bulletedList',
    'numberedList',
    'justifyLeft',
    'justifyRight',
    'justifyCenter',
    '|',
    'insertLink',
    // {
    //   key: 'group-image',
    //   title: bh('editor.image'),
    //   iconSvg: IMAGE_SVG,
    //   menuKeys: ['insertImage', 'uploadImage']
    // },
    'insertTable',
    'codeBlock',
    '|',
    'undo',
    'redo',
    '|',
    'fullScreen'
  ],
  excludeKeys: [
    /* 隐藏哪些菜单 */
  ]
}
const getDefaultContent = computed(() => cloneDeep(JSON.parse(contentCss.value))) // 注意，深拷贝
// 编辑器配置
const editorConfig = computed(() => {
  return {
    placeholder: '请输入内容...',
    readOnly: readOnly.value,
    MENU_CONF: {
      /* 菜单配置，下文解释 */
    }
  }
})

// 回调函数
const handleChange = (editor) => {
  emits('update:contentHtml', editor.getHtml())
  emits('update:contentCss', JSON.stringify(editor.children))
}

const customPaste = (editor, event, callback) => {
  console.log(event.clipboardData)
  console.log('ClipboardEvent 粘贴事件对象', event.clipboardData.getData('text/html'))

  // 自定义插入内容
  // editor.insertText(event.clipboardData.getData('text/html'))

  // 返回值（注意，vue 事件的返回值，不能用 return）
  callback(true) // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
}
// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = getEditor(editorId)

  if (editor == null) return

  // 销毁，并移除 editor
  editor.destroy()
  removeEditor(editorId)
})
</script>
