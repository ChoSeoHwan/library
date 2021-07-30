import OutputBuilder from '~src/builder/OutputBuilder';
import Output from '~src/option/Output';

describe('builder/OutputBuilder', () => {
    describe('constructor(), getOption()', () => {
        it('option 정상 등록 확인 / option 조회 기능 정상 동작 확인', () => {
            const option = {
                dir: 'dist/esm',
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);

            // option 확인
            expect(outputBuilder.getOption()).toMatchObject(option);
        });
    });

    describe('buildAMD()', () => {
        it('최초 옵션으로 amd build 확인', () => {
            const option = {
                dir: 'dist',
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);
            const output = outputBuilder.buildAMD();

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                format: 'amd'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });

        it('추가 옵션으로 amd build 확인', () => {
            const option = {
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);

            const additionalOptions = {
                dir: 'dist/amd'
            };
            const output = outputBuilder.buildAMD(additionalOptions);

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                ...additionalOptions,
                format: 'amd'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });
    });

    describe('buildCJS()', () => {
        it('최초 옵션으로 cjs build 확인', () => {
            const option = {
                dir: 'dist',
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);
            const output = outputBuilder.buildCJS();

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                format: 'cjs'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });

        it('추가 옵션으로 cjs build 확인', () => {
            const option = {
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);

            const additionalOptions = {
                dir: 'dist/cjs'
            };
            const output = outputBuilder.buildCJS(additionalOptions);

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                ...additionalOptions,
                format: 'cjs'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });
    });

    describe('buildES()', () => {
        it('최초 옵션으로 es build 확인', () => {
            const option = {
                dir: 'dist',
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);
            const output = outputBuilder.buildES();

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                format: 'es'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });

        it('추가 옵션으로 es build 확인', () => {
            const option = {
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);
            const additionalOptions = {
                dir: 'dist/esm'
            };
            const output = outputBuilder.buildES(additionalOptions);

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                ...additionalOptions,
                format: 'es'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });
    });

    describe('buildIIFE()', () => {
        it('최초 옵션으로 iife build 확인', () => {
            const option = {
                dir: 'dist',
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);
            const output = outputBuilder.buildIIFE('common');

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                name: 'common',
                format: 'iife'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });

        it('추가 옵션으로 iife build 확인', () => {
            const option = {
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);

            const additionalOptions = {
                dir: 'dist/iife'
            };
            const output = outputBuilder.buildIIFE('common', additionalOptions);

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                ...additionalOptions,
                name: 'common',
                format: 'iife'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });
    });

    describe('buildUMD()', () => {
        it('최초 옵션으로 umd build 확인', () => {
            const option = {
                dir: 'dist',
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);
            const output = outputBuilder.buildUMD('common');

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                name: 'common',
                format: 'umd'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });

        it('추가 옵션으로 umd build 확인', () => {
            const option = {
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);

            const additionalOptions = {
                dir: 'dist/umd'
            };
            const output = outputBuilder.buildUMD('common', additionalOptions);

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                ...additionalOptions,
                name: 'common',
                format: 'umd'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });
    });

    describe('buildSystem()', () => {
        it('최초 옵션으로 system build 확인', () => {
            const option = {
                dir: 'dist',
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);
            const output = outputBuilder.buildSystem();

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                format: 'system'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });

        it('추가 옵션으로 system build 확인', () => {
            const option = {
                sourcemap: true
            };

            const outputBuilder = new OutputBuilder(option);

            const additionalOptions = {
                dir: 'dist/system'
            };
            const output = outputBuilder.buildSystem(additionalOptions);

            // build 결과 확인
            const expectOutput = new Output({
                ...option,
                ...additionalOptions,
                format: 'system'
            });
            expect(output.toJson()).toMatchObject(expectOutput.toJson());
        });
    });
});
