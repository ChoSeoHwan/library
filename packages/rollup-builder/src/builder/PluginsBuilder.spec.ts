import { PluginsBuilder } from '~src/builder';

describe('builder/PluginsBuilder', () => {
    describe('buildBasePlugins()', () => {
        it('설정 필요한 plugin 이 존재하는지 확인', () => {
            const plugins = PluginsBuilder.buildBasePlugins();

            // plugin 테스트
            const expectPluginNames = [
                'rollup-builder-cleaner',
                'rollup-plugin-peer-deps-external',
                'rollup-plugin-typescript2',
                '@rollup/plugin-babel',
                '@rollup/plugin-node-resolve',
                '@rollup/plugin-commonjs',
                'rollup-plugin-terser'
            ];
            const pluginNames = plugins
                .getPlugins()
                .map((plugin) => plugin.getName());

            expect(pluginNames).toMatchObject(expectPluginNames);
        });
    });
});
