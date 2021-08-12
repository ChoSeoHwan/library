import { Plugin as RollupPlugin } from 'rollup';

import { OutputBuilder } from '~src/builder';
import buildRollupOptions from '~src/buildRollupOptions';
import { Input, Output, Plugin, Plugins } from '~src/option';

describe('buildRollupConfig', () => {
    const makePlugin = (
        name: string,
        options: unknown[] | ((output: Output) => unknown[])
    ): Plugin => {
        const creator = (...options: unknown[]): RollupPlugin => ({
            name,
            api: {
                name,
                options
            }
        });

        return new Plugin(name, creator, options);
    };

    it('build 시 예상한 결과와 동일한 결과 확인', () => {
        // 기본 값 세팅
        const input = new Input('src/index.ts');

        const outputBuilder = new OutputBuilder();
        const outputs = [
            outputBuilder.buildES({ file: 'dist/esm.js' }),
            outputBuilder.buildCJS({ file: 'dist/cjs.js' }),
            outputBuilder.buildUMD('common', { dir: 'dist/umd' }),
            outputBuilder.buildIIFE('common', { file: 'dist/iife.js' })
        ];

        const plugins = new Plugins(
            makePlugin('plugin1', ['option1', 'option2']),
            makePlugin('plugin2', ['option1']),
            makePlugin('plugin3', ['option1', 'option2'])
        );

        // rollup builder 객체 생성
        const rollupOptions = buildRollupOptions(input, outputs, plugins);

        // 예상 결과
        const expectOptions = outputs.map((output) => ({
            ...input.toJson(output),
            ...output.toJson(),
            ...plugins.toJson(output)
        }));

        // 예상한 결과와 실제 결과 테스트
        expect(rollupOptions).toMatchObject(expectOptions);
    });
});
