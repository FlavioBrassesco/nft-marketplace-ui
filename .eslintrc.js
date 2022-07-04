module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
    jest: true
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "prettier",
    "next/core-web-vitals",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
  },
};
