module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    Message: true,
    env: true,
    useRoute: true,
    useRouter: true,
    ElMessageBox: true,
    ElMessage: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended', 'vue-global-api'],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/comment-directive': 'off',
    'vue/no-v-model-argument': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'default-param-last': 'off',
    'no-unused-expressions': 'off',
    'guard-for-in': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
