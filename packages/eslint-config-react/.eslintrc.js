const eslintConfigBase = require('@choseohwan/eslint-config-base');

module.exports = {
    ...eslintConfigBase,
    plugins: [...eslintConfigBase.plugins, 'react', 'react-hooks'],
    extends: [
        ...eslintConfigBase.extends,
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    parserOptions: {
        ...eslintConfigBase.parserOptions,
        ecmaFeatures: {
            jsx: true
        }
    }
};
