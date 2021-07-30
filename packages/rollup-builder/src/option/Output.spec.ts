import { InternalModuleFormat, ModuleFormat, OutputOptions } from 'rollup';

import OutputError from '~src/errors/OutputError';
import Output from '~src/option/Output';

describe('option/Output', () => {
    describe('constructor(), getOption()', () => {
        it('option 정상 등록 확인 / option 정상 조회 확인', () => {
            const option: OutputOptions = {
                dir: 'dist/esm',
                format: 'umd',
                name: 'common',
                sourcemap: true
            };

            const output = new Output(option);
            const outputJson = output.getOption();

            expect(outputJson).toMatchObject({
                ...option
            });
        });

        describe('유효성 검사', () => {
            it('dir, file 이 지정되지 않을 경우 에러 확인', () => {
                const option: OutputOptions = {
                    sourcemap: true,
                    format: 'es'
                };

                const makeOutput = () => {
                    new Output(option);
                };

                // 에러 확인
                const expectError = OutputError.undefinedOutputPath();
                expect(makeOutput).toThrow(OutputError);
                expect(makeOutput).toThrow(expectError.message);
            });

            it('dir, file 둘다 지정되어 있을 경우 에러 확인', () => {
                const option: OutputOptions = {
                    dir: 'dist/esm',
                    file: 'dist/esm/test.js',
                    sourcemap: true,
                    format: 'es'
                };

                const makeOutput = () => {
                    new Output(option);
                };

                // 에러 확인
                const expectError = OutputError.redundantOutputPath();
                expect(makeOutput).toThrow(OutputError);
                expect(makeOutput).toThrow(expectError.message);
            });

            it('iife build 시 name 이 지정되지 않았을 경우 에러 확인', () => {
                const option: OutputOptions = {
                    dir: 'dist/iife',
                    format: 'iife'
                };

                const makeOutput = () => {
                    new Output(option);
                };

                // 에러 확인
                const expectError = OutputError.undefinedName();
                expect(makeOutput).toThrow(OutputError);
                expect(makeOutput).toThrow(expectError.message);
            });

            it('umd build 시 name 이 지정되지 않았을 경우 에러 확인', () => {
                const option: OutputOptions = {
                    dir: 'dist/umd',
                    format: 'umd'
                };

                const makeOutput = () => {
                    new Output(option);
                };

                // 에러 확인
                const expectError = OutputError.undefinedName();
                expect(makeOutput).toThrow(OutputError);
                expect(makeOutput).toThrow(expectError.message);
            });
        });
    });

    describe('getOutputDir()', () => {
        it('dir 등록 시 output path 정상 조회 확인', () => {
            const option: OutputOptions = {
                dir: 'dist/esm',
                format: 'esm',
                sourcemap: true
            };

            const output = new Output(option);

            // output path 확인
            expect(output.getOutputDir()).toBe('dist/esm');
        });

        it('file 등록 시 output path 정상 조회 확인', () => {
            const option: OutputOptions = {
                file: 'dist/test.js',
                format: 'esm',
                sourcemap: true
            };

            const output = new Output(option);

            // output path 확인
            expect(output.getOutputDir()).toBe('dist');
        });
    });

    describe('getFormat()', () => {
        const formats: ModuleFormat[] = [
            'es',
            'module',
            'esm',
            'cjs',
            'commonjs',
            'amd',
            'system',
            'systemjs',
            'iife',
            'umd'
        ];

        // output 객체 생성
        const outputs = formats.map(
            (format) =>
                new Output({
                    dir: `dist/${format}`,
                    format,
                    name: 'common'
                })
        );

        // 예상되는 포맷으로 테스트 시작
        const expectFormats: InternalModuleFormat[] = [
            'es',
            'es',
            'es',
            'cjs',
            'cjs',
            'amd',
            'system',
            'system',
            'iife',
            'umd'
        ];
        const outputFormats = outputs.map((output) => output.getFormat());
        expect(outputFormats).toMatchObject(expectFormats);
    });
});
