const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
    {
        files: ["src/**/*.js"],
        rules: {
            semi: "error",
            "prefer-const": "error",
            "no-unused-vars": "error",
            "max-len": [
                "error",
                {
                    code: 120,
                    ignoreComments: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                },
            ]
        },
    }
]);
