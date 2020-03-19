import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import image from '@rollup/plugin-image'
import { terser } from 'rollup-plugin-terser'
import { name as PROJECT_NAME } from './package.json'
import { DEFAULT_EXTENSIONS } from '@babel/core'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: `dist/${PROJECT_NAME}.umd.js`,
            format: 'umd',
            name: 'FRS'
        },
        {
            file: `dist/${PROJECT_NAME}.umd.min.js`,
            format: 'umd',
            name: 'FRS',
            plugins: [terser()]
        }
    ],
    plugins: [
        resolve(),
        image(),
        typescript({ useTsconfigDeclarationDir: true }),
        babel({
            exclude: 'node_modules/**',
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx']
        })
    ]
}
