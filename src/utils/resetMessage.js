import { ElMessage } from 'element-plus'
// import 'element-plus/theme-chalk/el-message.css'

let messageInstance = null
const Message = (options) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = ElMessage(options)
}
const types = ['error', 'success', 'info', 'warning']

types.forEach((type) => {
  Message[type] = (options) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})
export default Message
