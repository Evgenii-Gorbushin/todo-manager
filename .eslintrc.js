module.exports = {
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    }
  },

  "env": {
    "browser": true,
    "jest/globals": true,
    "es6": true
  },

  "extends": [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jest/recommended"
  ],

  "parser": "babel-eslint",

  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },

  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "jest"
  ],

  "rules": {
    "no-undef": [1],
    "no-unused-vars": [1],
    "no-console": [0],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "prefer-const": [
      "error",
      {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
      }
    ],
    "no-var": ["warn"],
    "object-shorthand": [
      "error",
      "always"
    ],
    "prefer-template": ["error"],
    "template-curly-spacing": [
      "error",
      "never"
    ],
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ],
    "arrow-body-style": [
      "error",
      "as-needed"
    ],
    "no-duplicate-imports": ["error"],
    "dot-notation": ["error"],
    "no-multi-assign": ["error"],
    "no-plusplus": ["error"],
    "no-unneeded-ternary": ["error"],
    "no-else-return": ["error"],
    "eol-last": ["error"],
    "no-whitespace-before-property": ["error"],
    "newline-per-chained-call": [
      "error",
      {
        "ignoreChainWithDepth": 2
      }
    ],
    "no-multiple-empty-lines": ["error"],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "block-spacing": ["error"],
    "computed-property-spacing": [
      "error",
      "never"
    ],
    "key-spacing": ["error"],
    "no-trailing-spaces": ["error"],
    "react/prefer-stateless-function": ["error"],
    "jsx-quotes": ["error"],
    "no-multi-spaces": ["error"],
    "react/jsx-tag-spacing": ["error"],
    "react/jsx-curly-spacing": ["error"],
    "react/jsx-wrap-multilines": ["error"],
    //"react/jsx-no-bind": ["warn"],
    "comma-dangle": ["error", "always-multiline"],
    "default-case": "error",
    "react/prop-types": "off",
    "no-extra-boolean-cast": "off"
  }
};
