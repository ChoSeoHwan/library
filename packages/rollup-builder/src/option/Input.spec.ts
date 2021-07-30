import { InputOption, InternalModuleFormat } from 'rollup';

import { OutputBuilder } from '~src/builder';
import Input from '~src/option/Input';

describe('option/Input', () => {
    const outputBuilder = new OutputBuilder({ dir: 'dist' });
    const outputs = [
        outputBuilder.buildES(),
        outputBuilder.buildCJS(),
        outputBuilder.buildAMD(),
        outputBuilder.buildIIFE('common'),
        outputBuilder.buildUMD('common'),
        outputBuilder.buildSystem()
    ];

    describe('constructor(), toJson()', () => {
        it('input option 등록 확인 / input option 조회 확인', () => {
            const option: InputOption = ['src/index.js', 'src/option.js'];
            const input = new Input(option);

            // 모든 값이 option 과 동일한지 테스트
            const expectInputOptions: Record<'input', InputOption>[] =
                outputs.map(() => ({
                    input: option
                }));
            const inputOptions = outputs.map((output) => input.toJson(output));
            expect(inputOptions).toMatchObject(expectInputOptions);
        });

        it('input 추가 옵션과 함께 생성 시 toJson 확인', () => {
            const option: InputOption = ['src/index.js', 'src/option.js'];
            const additionalOption: Partial<
                Record<InternalModuleFormat, InputOption>
            > = {
                iife: 'src/index.js',
                es: {
                    test_1: 'src/test_1.ts',
                    test_2: 'src/test_2.ts'
                }
            };
            const input = new Input(option, additionalOption);

            // format 에 따라 option 이 변경되는지 테스트
            const expectInputOptions: Record<'input', InputOption>[] =
                outputs.map((output) => ({
                    input: additionalOption[output.getFormat()] || option
                }));
            const inputOptions = outputs.map((output) => input.toJson(output));
            expect(inputOptions).toMatchObject(expectInputOptions);
        });
    });
});
