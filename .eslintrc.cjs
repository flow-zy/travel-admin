module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'eslint-config-prettier',
    'plugin:prettier/recommended',
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project:['./tsconfig.json']
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier':0,
    'react/react-in-jsx-scope':0,
    semi:['error','never'],
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-namespace':0,
    '@typescript-eslint/explicit-function-return-type':0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/consistent-indexed-object-style': 0,
    '@typescript-eslint/no-dynamic-delete':0,
    'array-callback-return':0,
    '@typescript-eslint/strict-boolean-expressions':0,
    '@typescript-eslint/prefer-optional-chain': 0,
    '@typescript-eslint/no-unused-expressions':0,
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/restrict-template-expressions':0,
    '@typescript-eslint/await-thenable':0,
    '@typescript-eslint/no-confusing-void-expression':0
  },
}
