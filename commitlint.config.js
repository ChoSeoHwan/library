module.exports = {
    extends: [
        '@commitlint/config-conventional',
        '@commitlint/config-lerna-scopes'
    ],
    rules: {
        'subject-case': [0]
    }
};
