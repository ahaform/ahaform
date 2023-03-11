import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel'; // rollup 的 babel 插件，ES6转ES5
import resolve from '@rollup/plugin-node-resolve'; // 帮助寻找node_modules里的包
import commonjs from '@rollup/plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import typescript from '@rollup/plugin-typescript';
import css from "rollup-plugin-import-css";
import { eslint } from 'rollup-plugin-eslint';

// https://rollupjs.org/guide/en/#configuration-files
function getBaseConfig() {
    const plugins = [
        json(),
        typescript(),
        resolve(),
        commonjs(),
        // eslint({
        //     exclude: ['node_modules']
        // }),
        babel({
            exclude: ['node_modules'] // 忽略 node_modules
            // runtimeHelpers: true // 开启体积优化
        }),
        css()
    ];

    return defineConfig([
        {
            input: 'src/form/main.ts',
            treeshake: true,
            output: {
                file: 'dist/ahaform.js',
                format: 'iife'
            },
            plugins
        },
        {
            input: 'src/template/main.ts',
            treeshake: true,
            output: {
                file: 'dist/ahaform.template.js',
                format: 'iife'
            },
            plugins
        }
    ]);
}

export default getBaseConfig;
