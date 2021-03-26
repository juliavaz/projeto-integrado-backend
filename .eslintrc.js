module.exports = {
  env: {
    commonjs: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    camelcase: 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: { multiline: true, minProperties: 6 },
      },
    ],
  },
};
