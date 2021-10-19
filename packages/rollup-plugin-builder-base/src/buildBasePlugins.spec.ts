import { Plugin } from '@choseohwan/rollup-builder';

import buildBasePlugins from '~src/buildBasePlugins';

describe('pluginBuilderBase', () => {
    it('pluginBuilder plugin 리스트 확인', () => {
        const expectPluginList = [
            'rollup-builder-cleaner',
            'rollup-plugin-peer-deps-external',
            '@rollup/plugin-json',
            '@rollup/plugin-node-resolve',
            'rollup-plugin-typescript2',
            '@rollup/plugin-commonjs',
            '@rollup/plugin-babel',
            'rollup-plugin-terser'
        ];

        const plugins = buildBasePlugins();

        let executed = false;
        plugins.getPlugins().forEach((plugin: Plugin, index: number) => {
            const expectPluginName = expectPluginList[index];

            expect(plugin.getName()).toBe(expectPluginName);
            executed = true;
        });

        expect(executed).toBeTruthy();
    });
});
