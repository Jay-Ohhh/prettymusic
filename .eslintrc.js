// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 0,
    'vue/return-in-computed-property': 0,
    'quote-props': 0,
    'vue/no-unused-components': 0,
    'no-undef': 0,
    'vue/no-unused-vars': 0,
    'vue/no-parsing-error': 0,
    'vue/no-unused-vars': 0,
  },
}
