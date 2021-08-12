import { Plugin as RollupPlugin } from 'rollup';
import { RPT2Options } from 'rollup-plugin-typescript2';

import Output from '~src/option/Output';
import Plugin from '~src/option/Plugin';

// typescript mocking
const pluginCreator = (option: RPT2Options, test?: string): RollupPlugin => ({
    name: 'typescript',
    api: {
        ...option,
        test
    }
});
const mockedPlugin = jest
    .fn<RollupPlugin, Parameters<typeof pluginCreator>>()
    .mockImplementation(pluginCreator);

beforeEach(() => {
    mockedPlugin.mockClear();
});

describe('option/plugin/Plugin', () => {
    const pluginName = '@rollup/plugin-typescript';

    // Plugin 객체 생성 함수
    const createPlugin = (options: Parameters<typeof mockedPlugin>) =>
        new Plugin<typeof mockedPlugin>(pluginName, mockedPlugin, options);

    describe('constructor(), toRollupPlugin()', () => {
        it('option 결과 확인', () => {
            const output = new Output({
                dir: 'dist',
                format: 'es',
                sourcemap: true
            });

            const options: [RPT2Options, string] = [
                {
                    tsconfig: 'tsconfig.json'
                },
                'test'
            ];

            // plugin 객체 생성
            const plugin = new Plugin(pluginName, mockedPlugin, options);

            // rollup plugin 생성
            const rollupPluginData = plugin.toRollupPlugin(output);

            // 플러그인 creator 호출 여부 확인
            expect(mockedPlugin).toBeCalled();
            expect(mockedPlugin).toBeCalledWith(...options);

            // 실제 플러그인 데이터가 맞는지 확인
            expect(rollupPluginData).toMatchObject({
                name: 'typescript',
                api: {
                    ...options[0],
                    test: options[1]
                }
            });
        });

        it('option 함수로 등록 시 output 에 따른 결과 확인', () => {
            const optionCreator = (
                output: Output
            ): Parameters<typeof mockedPlugin> => [
                {
                    tsconfig: 'tsconfig.json',
                    tsconfigDefaults: {
                        compilerOptions: {
                            outDir: output.getOutputDir(),
                            plugins: [
                                {
                                    transform: 'typescript-transform-paths',
                                    afterDeclarations: true
                                }
                            ]
                        }
                    }
                },
                'testArguments'
            ];

            // plugin 생성
            const plugin = new Plugin(pluginName, mockedPlugin, optionCreator);

            // output 에 대한 결과 테스트
            const outputs = [
                new Output({
                    dir: 'dist/ems',
                    format: 'es',
                    sourcemap: true
                }),
                new Output({
                    file: 'dist/umd/index.js',
                    format: 'umd',
                    name: 'common',
                    sourcemap: true
                })
            ];

            outputs.forEach((output) => {
                expect(plugin.toRollupPlugin(output)).toMatchObject({
                    name: 'typescript',
                    api: {
                        tsconfig: 'tsconfig.json',
                        outputDir: output.getOutputDir(),
                        test: 'testArguments'
                    }
                });
            });
        });
    });

    describe('getName()', () => {
        it('plugin 이름 조회 테스트', () => {
            const plugin = createPlugin([
                {
                    tsconfig: 'tsconfig.js'
                }
            ]);

            // 테스트
            expect(plugin.getName()).toBe(pluginName);
        });
    });

    describe('getOptions()', () => {
        it('plugin options 조회 테스트', () => {
            const options: [RPT2Options, string] = [
                {
                    tsconfig: 'tsconfig.json'
                },
                'test'
            ];
            const plugin = createPlugin(options);

            // 테스트
            expect(plugin.getOptions()).toMatchObject(options);
        });
    });

    describe('setOptions()', () => {
        it('plugin options 등록 테스트', () => {
            const options: [RPT2Options, string] = [
                {
                    tsconfig: 'tsconfig.json'
                },
                'test'
            ];
            const plugin = createPlugin(options);

            // 기존 옵션이 맞는지 확인
            expect(plugin.getOptions()).toMatchObject(options);

            // 새로운 option 등록
            const newOptions: [RPT2Options] = [
                { tsconfig: 'tsconfig.test.json' }
            ];
            plugin.setOptions(newOptions);

            // 새로 등록된 options 이 맞는지 확인
            expect(plugin.getOptions()).toMatchObject(newOptions);
        });
    });
});
