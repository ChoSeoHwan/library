module.exports = {
    env: {
        browser: true,
        es2022: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:jsdoc/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
        'prettier',
        'simple-import-sort',
        'jsdoc',
        'import'
    ],
    rules: {
        eqeqeq: ['error', 'always'],
        'prettier/prettier': 'error',
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                allowSingleExtends: true
            }
        ],
        "@typescript-eslint/no-explicit-any": 2,
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'jsdoc/require-throws': 1,
        "jsdoc/require-param-type": 0,
        "jsdoc/require-property-type": 0,
        "jsdoc/require-returns-type": 0,
        "import/no-default-export": 2
    }
};
