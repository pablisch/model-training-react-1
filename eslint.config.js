import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import prettierConfig from 'eslint-config-prettier'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
    {
        ignores: ['dist'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            prettierConfig,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
            },
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettier,
            react: react,
            '@stylistic': stylistic,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: 'function', next: 'return' },
                { blankLine: 'always', prev: '*', next: 'return' },
            ],
            'no-extra-semi': 'off',
            'lines-between-class-members': 'off',
            'padding-line-between-statements': 'off',
            'prettier/prettier': [
                'error',
                {
                    usePrettierrc: true,
                },
            ],
        },
    }
)