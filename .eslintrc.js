module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    // 0 => off
    // 1 => warn
    // 2 => error
    'no-unused-vars': 0,        // 没有未使用的变量
    "quotes": ['warn', 'single'],  // 引号
    'linebreak-style': [0 ,'error', 'windows'],  // 是否使用一致的回车换行符
    'semi': [0],     // 末尾是否添加分号
    'eol-last': 0,   // 在非空文件的结尾添加一个换行符
    'no-irregular-whitespace': 'off',
    'comma-dangle': 'off',
    'import/newline-after-import': 'off',
    'arrow-parens': 'off',
    'import/no-unresolved': 'off',
    'no-trailing-spaces': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'default-case': 'off',
    'arrow-body-style': 'off',
    'no-shadow': 'off',
    'prefer-template': 'off'
  },
};
