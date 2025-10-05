import webpack from 'webpack'
import path from 'path';
import { BuildEnv, BuildPaths } from './config/build/types/config';
import { BuildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src')

    }
    const mode = env?.mode || 'development';
    const isDev = mode === 'development';

    const config: webpack.Configuration = BuildWebpackConfig({
        paths,
        mode: 'development',
        port: 3000,
        isDev
    })


    return config
}
