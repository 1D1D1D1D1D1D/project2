import { type BuildOptions } from "./types/config"
import type webpack from 'webpack';
import { buildResolvers } from "./buildResolvers";
import { buildLoaders } from "./buildLoaders";
import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";



export function BuildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { mode, paths, isDev } = options
    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/'
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),

        },
        resolve: buildResolvers(options),

        devServer: buildDevServer(options)
    }
}