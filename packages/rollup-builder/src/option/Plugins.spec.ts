import { Plugin as RollupPlugin } from 'rollup';

import PluginsError from '~src/errors/PluginsError';
import { Output, Plugin, Plugins } from '~src/option';

const makePlugin = (name: string, ...etc: unknown[]): Plugin => {
    const pluginCreator = (name: string, ...etc: unknown[]): RollupPlugin => ({
        name,
        api: etc
    });

    return new Plugin(name, pluginCreator, [name, ...etc]);
};

describe('option/Plugins', () => {
    describe('constructor()', () => {
        it('plugin 등록 시 존재 확인', () => {
            const pluginList = [
                makePlugin('plugin1', 'option1', 'options2', 'option3'),
                makePlugin('plugin2', 'option1', 'options2')
            ];
            const plugins = new Plugins(...pluginList);

            // plugin 갯수 확인
            expect(plugins.getPlugins()).toHaveLength(2);
            plugins.getPlugins().forEach((plugin, index) => {
                expect(plugin.getName()).toBe(pluginList[index].getName());
            });
        });

        it('plugin 이름 중복으로 등록 시 에러 발생 확인', () => {
            const pluginList = [
                makePlugin('plugin1', 'option1', 'options2', 'option3'),
                makePlugin('plugin2', 'option1', 'options2'),
                makePlugin('plugin1', 'option1', 'options2')
            ];

            const createPlugins = () => {
                new Plugins(...pluginList);
            };

            // 에러 발생 확인
            const expectError = PluginsError.duplicatedPluginName(['plugin1']);
            expect(createPlugins).toThrow(PluginsError);
            expect(createPlugins).toThrow(expectError.message);
        });
    });

    describe('getPlugins()', () => {
        it('plugins 에 plugin 추가 리스트 조회 확인', () => {
            const pluginList = [
                makePlugin('plugin1', 'option1', 'options2', 'option3'),
                makePlugin('plugin2', 'option1', 'options2'),
                makePlugin('plugin3', 'option3')
            ];
            const plugins = new Plugins(...pluginList);

            // plugin 보유 여부 확인
            expect(plugins.getPlugins()).toHaveLength(pluginList.length);
            plugins.getPlugins().forEach((plugin, index) => {
                expect(plugin.getName()).toBe(pluginList[index].getName());
            });
        });
    });

    describe('pushPlugin()', () => {
        it('plugin 추가 시 존재 확인', () => {
            const pluginList = [
                makePlugin('plugin1', 'option1', 'options2', 'option3'),
                makePlugin('plugin2', 'option1', 'options2')
            ];
            const plugins = new Plugins(...pluginList);

            // 현재 plugin 확인
            expect(plugins.getPlugins()).toHaveLength(2);

            // plugin 추가
            const additionalPluginList = [
                makePlugin('plugin3', 'option1', 'option3'),
                makePlugin('plugin4', 'option1', 'options2'),
                makePlugin('plugin5', 'option1')
            ];
            plugins.pushPlugin(...additionalPluginList);

            // plugin 보유 여부 확인
            const expectPluginList = [...pluginList, ...additionalPluginList];
            expect(plugins.getPlugins()).toHaveLength(expectPluginList.length);
            plugins.getPlugins().forEach((plugin, index) => {
                expect(plugin.getName()).toBe(
                    expectPluginList[index].getName()
                );
            });
        });

        it('plugin 이름 중복으로 추가 시 에러 발생 확인', () => {
            const plugins = new Plugins(
                makePlugin('plugin1', 'option1', 'options2', 'option3'),
                makePlugin('plugin2', 'option1', 'options2')
            );

            // 플러그인 중복 추가
            const addDuplicatePlugins = () => {
                plugins.pushPlugin(
                    makePlugin('plugin2', 'option1', 'options2'),
                    makePlugin('plugin3', 'option1', 'option2'),
                    makePlugin('plugin1', 'option1')
                );
            };

            // 중복 플러그인 에러 발생 확인
            const expectError = PluginsError.duplicatedPluginName([
                'plugin1',
                'plugin2'
            ]);
            expect(addDuplicatePlugins).toThrow(PluginsError);
            expect(addDuplicatePlugins).toThrow(expectError.message);
        });
    });

    describe('unshiftPlugin()', () => {
        it('plugin 추가 시 존재 확인', () => {
            const pluginList = [
                makePlugin('plugin1', 'option1', 'options2', 'option3'),
                makePlugin('plugin2', 'option1', 'options2')
            ];
            const plugins = new Plugins(...pluginList);

            // 현재 plugin 확인
            expect(plugins.getPlugins()).toHaveLength(2);

            // plugin 추가
            const additionalPluginList = [
                makePlugin('plugin3', 'option1', 'option3'),
                makePlugin('plugin4', 'option1', 'options2'),
                makePlugin('plugin5', 'option1')
            ];
            plugins.unshiftPlugin(...additionalPluginList);

            // plugin 보유 여부 확인
            const expectPluginList = [...additionalPluginList, ...pluginList];
            expect(plugins.getPlugins()).toHaveLength(expectPluginList.length);
            plugins.getPlugins().forEach((plugin, index) => {
                expect(plugin.getName()).toBe(
                    expectPluginList[index].getName()
                );
            });
        });

        it('plugin 이름 중복으로 추가 시 에러 발생 확인', () => {
            const plugins = new Plugins(
                makePlugin('plugin1', 'option1', 'options2', 'option3'),
                makePlugin('plugin2', 'option1', 'options2')
            );

            // 플러그인 중복 추가
            const addDuplicatePlugins = () => {
                plugins.unshiftPlugin(
                    makePlugin('plugin2', 'option1', 'options2'),
                    makePlugin('plugin3', 'option1', 'option2'),
                    makePlugin('plugin1', 'option1')
                );
            };

            // 중복 플러그인 에러 발생 확인
            const expectError = PluginsError.duplicatedPluginName([
                'plugin1',
                'plugin2'
            ]);
            expect(addDuplicatePlugins).toThrow(PluginsError);
            expect(addDuplicatePlugins).toThrow(expectError.message);
        });
    });

    describe('appendPlugin()', () => {
        it('특정 plugin 뒤에 plugin 추가 확인', () => {
            const plugins = new Plugins(
                makePlugin('plugin1', 'option1', 'option2', 'option3'),
                makePlugin('plugin4', 'option1', 'option2'),
                makePlugin('plugin5', 'option1', 'option2', 'option3')
            );

            // plugin1 뒤에 plugin2,3 추가
            plugins.appendPlugin(
                'plugin1',
                makePlugin('plugin2', 'option1'),
                makePlugin('plugin3', 'option1')
            );

            // 추가된 플러그인 리스트 조회
            const addedPluginList = plugins.getPlugins();
            expect(addedPluginList.length).toBe(5);

            // 전체 plugin 리스트 순서 확인
            const pluginNames = [
                'plugin1',
                'plugin2',
                'plugin3',
                'plugin4',
                'plugin5'
            ];
            addedPluginList.forEach((plugin, index) => {
                expect(plugin.getName()).toBe(pluginNames[index]);
            });
        });

        it('plugin 이름 중복으로 추가 시 에러 발생 확인', () => {
            const plugins = new Plugins(
                makePlugin('plugin1', 'option1', 'option2', 'option3'),
                makePlugin('plugin2', 'option1', 'option2'),
                makePlugin('plugin3', 'option1', 'option2', 'option3')
            );

            const appendPluginList = () => {
                plugins.appendPlugin(
                    'plugin1',
                    makePlugin('plugin2', 'option1', 'option2'),
                    makePlugin('plugin3', 'option1', 'option2', 'option3')
                );
            };

            // 에러 발생 확인
            const expectError = PluginsError.duplicatedPluginName([
                'plugin2',
                'plugin3'
            ]);
            expect(appendPluginList).toThrow(PluginsError);
            expect(appendPluginList).toThrow(expectError.message);
        });

        it('등록되지 않은 plugin 뒤에 추가 시 에러 발생 확인', () => {
            const plugins = new Plugins(
                makePlugin('plugin1', 'option1', 'option2', 'option3'),
                makePlugin('plugin2', 'option1', 'option2'),
                makePlugin('plugin3', 'option1', 'option2', 'option3')
            );

            const appendPlugin = () => {
                plugins.appendPlugin(
                    'plugin4',
                    makePlugin('plugin5', 'option1', 'option2')
                );
            };

            // 에러 발생 확인
            const expectError = PluginsError.undefinedPlugin('plugin4');
            expect(appendPlugin).toThrow(PluginsError);
            expect(appendPlugin).toThrow(expectError.message);
        });
    });

    describe('removePlugin()', () => {
        it('plugin 제거 확인', () => {
            const plugins = new Plugins(
                makePlugin('plugin1', 'option1', 'option2', 'option3'),
                makePlugin('plugin2', 'option1', 'option2'),
                makePlugin('plugin3', 'option1', 'option2', 'option3')
            );

            // plugin 제거
            plugins.removePlugin('plugin2');
            const currentPluginList = plugins.getPlugins();

            // 제거 확인
            expect(currentPluginList.length).toBe(2);

            // 제거된 플러그인 리스트 확인
            const pluginNames = ['plugin1', 'plugin3'];
            currentPluginList.forEach((plugin, index) => {
                expect(plugin.getName()).toBe(pluginNames[index]);
            });
        });

        it('등록되지 않은 plugin 제거 시 에러 발생 확인', () => {
            const plugins = new Plugins(
                makePlugin('plugin1', 'option1', 'option2', 'option3'),
                makePlugin('plugin3', 'option1', 'option2'),
                makePlugin('plugin4', 'option1', 'option2', 'option3')
            );

            // plugin 제거
            const removePlugin = () => {
                plugins.removePlugin('plugin2');
            };

            // 에러 발생 확인
            const expectError = PluginsError.undefinedPlugin('plugin2');
            expect(removePlugin).toThrow(PluginsError);
            expect(removePlugin).toThrow(expectError.message);
        });
    });

    describe('findPlugin()', () => {
        it('plugin 이름으로 조회 확인', () => {
            const plugin = makePlugin('plugin1', 'option1', 'option2');
            const plugins = new Plugins(plugin);

            const foundPlugin = plugins.findPlugin(plugin.getName());

            // 찾은 플러그인이 맞는지 확인
            expect(foundPlugin.getName()).toBe(plugin.getName());
        });

        it('등록되지 않은 plugin 조회 시 에러 발생 확인', () => {
            const findPluginName = 'plugin2';
            const plugins = new Plugins(
                makePlugin('plugin1', 'option1', 'option2')
            );

            const findPlugin = () => {
                plugins.findPlugin(findPluginName);
            };

            // 에러 발생
            const expectError = PluginsError.undefinedPlugin(findPluginName);
            expect(findPlugin).toThrow(PluginsError);
            expect(findPlugin).toThrow(expectError.message);
        });
    });

    describe('toJson()', () => {
        it('toJson 정상 동작 확인', () => {
            const output = new Output({
                dir: 'dist',
                sourcemap: true,
                format: 'iife',
                name: 'common'
            });

            const pluginList = [
                makePlugin('plugin1', 'option1'),
                makePlugin('plugin2', 'option1', 'option2'),
                makePlugin('plugin3')
            ];

            // Plugins 객체 생성
            const plugins = new Plugins(...pluginList);
            const pluginsJson = plugins.toJson(output);

            // 테스트
            expect(pluginsJson.plugins).toBeTruthy();
            expect(pluginsJson.plugins.length).toBe(pluginList.length);

            // 각 플러그인 json 결과 확인
            pluginsJson.plugins.forEach((plugin, index) => {
                expect(plugin).toMatchObject(
                    pluginList[index].toRollupPlugin(output)
                );
            });
        });
    });
});
