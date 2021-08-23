module.exports = (api, { env, react, typescript }) => ({
    "presets": [
        ["@babel/preset-env", env],
        [
            "@babel/preset-react",
            {
                "runtime": "automatic",
                ...react
            }
        ],
        ["@babel/preset-typescript", typescript]
    ]
});
