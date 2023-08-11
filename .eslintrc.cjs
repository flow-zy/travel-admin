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
    '@typescript-eslint/explicit-function-return-type':0
  },
}
