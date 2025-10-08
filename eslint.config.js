import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    // 主要配置
    files: ["**/*.{js,mjs,cjs,ts,tsx,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        // 可添加项目特定的全局变量
      }
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          "allowShortCircuit": true,
          "allowTernary": true,
          "allowTaggedTemplates": true
        }
      ]
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    }
  },
  {
    // Vue 文件特定配置
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      "vue/multi-word-component-names": "warn",
      "vue/no-unused-vars": "warn"
    }
  },
  {
    // 可选的：针对特定文件类型的配置
    files: ["**/*.{ts,tsx}"],
    rules: {
      // TypeScript 特定规则
    }
  }
];