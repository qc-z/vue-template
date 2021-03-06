export default {
  defaultTheme: {
    '--el-background-color-base': '#f5f7fa',
    '--el-color-white': '#ffffff',
    '--el-color-black': '#ffffff',
    '--el-color-primary': '#409eff',
    '--el-color-primary-light-1': '#53a8ff',
    '--el-color-primary-light-2': '#66b1ff',
    '--el-color-primary-light-3': '#79bbff',
    '--el-color-primary-light-4': '#8cc5ff',
    '--el-color-primary-light-5': '#a0cfff',
    '--el-color-primary-light-6': '#b3d8ff',
    '--el-color-primary-light-7': '#c6e2ff',
    '--el-color-primary-light-8': '#d9ecff',
    '--el-color-primary-light-9': '#ecf5ff',
    '--el-color-success': '#67c23a',
    '--el-color-success-light': '#e1f3d8',
    '--el-color-success-lighter': '#f0f9eb',
    '--el-color-warning': '#e6a23c',
    '--el-color-warning-light': '#faecd8',
    '--el-color-warning-lighter': '#fdf6ec',
    '--el-color-danger': '#f56c6c',
    '--el-color-danger-light': '#fde2e2',
    '--el-color-danger-lighter': '#fef0f0',
    '--el-color-error': '#f56c6c',
    '--el-color-error-light': '#fde2e2',
    '--el-color-error-lighter': '#fef0f0',
    '--el-color-info': '#909399',
    '--el-color-info-light': '#e9e9eb',
    '--el-color-info-lighter': '#f4f4f5',
    '--el-text-color-primary': '#303133',
    '--el-text-color-regular': '#606266',
    '--el-text-color-secondary': '#909399',
    '--el-text-color-placeholder': '#c0c4cc',
    '--el-border-color-base': '#dcdfe6',
    '--el-border-color-light': '#e4e7ed',
    '--el-border-color-lighter': '#ebeef5',
    '--el-border-color-extra-light': '#f2f6fc',
    '--color-input-bg': '#f4f5f5',
    '--color-input-error-bg': '#ffece8',
    '--color-input-placeholder': '#86909c',
    '--color-input-text': '#4e5969',
    '--color-input-icon': '#f53f3f',
    '--el-popup-modal-background-color': 'var(--el-color-black)',
    '--el-popup-modal-opacity': '.5',
    '--el-border-width-base': '1px',
    '--el-border-style-base': 'solid',
    '--el-border-color-hover': 'var(--el-text-color-placeholder)',
    '--el-border-base':
      'var(--el-border-width-base) var(--el-border-style-base) var(--el-border-color-base)',
    '--el-border-radius-base': '4px',
    '--el-border-radius-small': '2px',
    '--el-border-radius-round': '20px',
    '--el-border-radius-circle': '100%',
    '--el-box-shadow-base': '0 2px 4px rgba(0, 0, 0, .12),0 0 6px rgba(0, 0, 0, .04)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(0, 0, 0, .1)',
    '--el-svg-monochrome-grey': '#dcdde0',
    '--el-fill-base': 'var(--el-color-white)',
    '--el-font-size-extra-large': '20px',
    '--el-font-size-large': '18px',
    '--el-font-size-medium': '16px',
    '--el-font-size-base': '14px',
    '--el-font-size-small': '13px',
    '--el-font-size-extra-small': '12px',
    '--el-font-weight-primary': '500',
    '--el-font-line-height-primary': '24px',
    '--el-font-color-disabled-base': '#bbb',
    '--el-index-normal': '1',
    '--el-index-top': '1000',
    '--el-index-popper': '2000',
    '--el-disabled-fill-base': 'var(--el-background-color-base)',
    '--el-disabled-color-base': 'var(--el-text-color-placeholder)',
    '--el-disabled-border-base': 'var(--el-border-color-light)',
    '--el-transition-duration': '.3s',
    '--el-transition-duration-fast': '.2s',
    '--el-transition-function-ease-in-out-bezier': 'cubic-bezier(.645, .045, .355, 1)',
    '--el-transition-function-fast-bezier': 'cubic-bezier(.23, 1, .32, 1)',
    '--el-transition-all':
      'all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier)',
    '--el-transition-fade':
      'opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier)',
    '--el-transition-md-fade':
      'transform var(--el-transition-duration) var(--el-transition-function-fast-bezier),opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier)',
    '--el-transition-fade-linear': 'opacity var(--el-transition-duration-fast) linear',
    '--el-transition-border':
      'border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier)',
    '--el-transition-color':
      'color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier)'
  },
  darkTheme: {
    '--el-color-primary': '#1B95F8', // ?????????
    '--el-background-color-base': '#01305F', // ???????????????
    '--el-color-white': '#1B3651', // ????????????
    '--el-color-black': '#012447', // ????????????
    '--el-text-color-primary': '#FFFFFF', // ??????????????????
    '--el-text-color-regular': '#FFFFFF', // ??????????????????
    '--el-text-color-placeholder': '#c0c4cc', // ??????????????????
    '--el-text-color-secondary': '#FFFFFF', // ??????????????????
    '--el-border-color-base': '#2590F9', // ??????????????????
    '--el-border-color-light': '#388DE0', // ??????????????????
    '--el-border-color-lighter': '#58A9F5', // ??????????????????
    '--el-border-color-extra-light': '#86B3F9', // ??????????????????
    '--el-color-success': '#67c23a', // ????????????
    '--el-color-success-light': '#e1f3d8',
    '--el-color-success-lighter': '#f0f9eb',
    '--el-color-warning': '#e6a23c', // ????????????
    '--el-color-warning-light': '#faecd8',
    '--el-color-warning-lighter': '#fdf6ec',
    '--el-color-danger': '#f56c6c', // ????????????
    '--el-color-danger-light': '#fde2e2',
    '--el-color-danger-lighter': '#fef0f0',
    '--el-color-error': '#f56c6c', // ????????????
    '--el-color-error-light': '#fde2e2',
    '--el-color-error-lighter': '#fef0f0',
    '--el-color-info': '#7B88A9', // ????????????
    '--el-color-info-light': '#e9e9eb',
    '--el-color-info-lighter': '#f4f4f5',
    '--color-input-bg': '#f4f5f5', // input ?????????
    '--color-input-error-bg': '#ffece8',
    '--color-input-placeholder': '#86909c',
    '--color-input-text': '#4e5969',
    '--color-input-icon': '#f53f3f',
    '--el-svg-monochrome-grey': '#dcdde0',
    '--el-font-color-disabled-base': '#bbb',
    '--el-popup-modal-background-color': 'var(--el-color-black)',
    '--el-popup-modal-opacity': '.5',
    '--el-border-width-base': '1px',
    '--el-border-style-base': 'solid',
    '--el-border-color-hover': 'var(--el-text-color-placeholder)',
    '--el-border-base':
      'var(--el-border-width-base) var(--el-border-style-base) var(--el-border-color-base)',
    '--el-border-radius-base': '4px',
    '--el-border-radius-small': '2px',
    '--el-border-radius-round': '20px',
    '--el-border-radius-circle': '100%',
    '--el-box-shadow-base': '0 2px 4px rgba(0, 0, 0, .12),0 0 6px rgba(0, 0, 0, .04)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(0, 0, 0, .1)',
    '--el-fill-base': 'var(--el-color-white)',
    '--el-font-size-extra-large': '20px',
    '--el-font-size-large': '18px',
    '--el-font-size-medium': '16px',
    '--el-font-size-base': '14px',
    '--el-font-size-small': '13px',
    '--el-font-size-extra-small': '12px',
    '--el-font-weight-primary': '500',
    '--el-font-line-height-primary': '24px',
    '--el-index-normal': '1',
    '--el-index-top': '1000',
    '--el-index-popper': '2000',
    '--el-disabled-fill-base': 'var(--el-background-color-base)',
    '--el-disabled-color-base': 'var(--el-text-color-placeholder)',
    '--el-disabled-border-base': 'var(--el-border-color-light)',
    '--el-transition-duration': '.3s',
    '--el-transition-duration-fast': '.2s',
    '--el-transition-function-ease-in-out-bezier': 'cubic-bezier(.645, .045, .355, 1)',
    '--el-transition-function-fast-bezier': 'cubic-bezier(.23, 1, .32, 1)',
    '--el-transition-all':
      'all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier)',
    '--el-transition-fade':
      'opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier)',
    '--el-transition-md-fade':
      'transform var(--el-transition-duration) var(--el-transition-function-fast-bezier),opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier)',
    '--el-transition-fade-linear': 'opacity var(--el-transition-duration-fast) linear',
    '--el-transition-border':
      'border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier)',
    '--el-transition-color':
      'color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier)'
  }
}
