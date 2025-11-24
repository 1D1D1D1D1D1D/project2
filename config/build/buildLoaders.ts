import type webpack from 'webpack'
import { buildCssLoader } from './loaders/buildCssLoader'
import { BuildOptions } from './types/config'

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {

    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
    }
    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }
    const cssLoader = buildCssLoader(isDev)
    return [
        tsLoader,
        cssLoader,
        svgLoader,
        fileLoader
    ]
}