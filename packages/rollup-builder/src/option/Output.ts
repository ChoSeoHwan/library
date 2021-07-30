import { InternalModuleFormat, OutputOptions } from 'rollup';

import OutputError from '~src/errors/OutputError';
import OptionInterface from '~src/option/OptionInterface';

interface OutputJson {
    output: OutputOptions;
}

class Output implements OptionInterface<OutputJson> {
    private readonly option: OutputOptions = {};

    constructor(option: OutputOptions) {
        // dir 및 file 존재 여부 체크
        if (!option.dir && !option.file) {
            throw OutputError.undefinedOutputPath();
        }

        // dir 및 file 중복 선언 체크
        if (option.dir && option.file) {
            throw OutputError.redundantOutputPath();
        }

        // umd, iife 에서 name 이 선언되지 않을 경우
        if (
            option.format &&
            ['umd', 'iife'].includes(option.format) &&
            !option.name
        ) {
            throw OutputError.undefinedName();
        }

        this.option = option;
    }

    /**
     * 현재 option 조회
     *
     * @returns {OutputOptions} 현재 option
     */
    getOption(): OutputOptions {
        return this.option;
    }

    /**
     * 등록된 dir 및 file 경로로 output dir 경로 조회
     *
     * @returns {string} output dir 경로
     * @throws OutputError
     */
    getOutputDir(): string {
        if (this.option.dir) {
            return this.option.dir;
        }

        if (!this.option.file) {
            throw OutputError.undefinedOutputPath();
        }

        // file 경로로 dir 조회
        const dirs = this.option.file.split('/');
        dirs.pop();

        return dirs.join('/');
    }

    /**
     * 현재 output 의 format 조회
     *
     * @returns {InternalModuleFormat} 현재 format (alias 는 원본으로 전달)
     */
    getFormat(): InternalModuleFormat {
        switch (this.option.format) {
            case 'commonjs':
                return 'cjs';

            case 'esm':
            case 'module':
                return 'es';

            case 'systemjs':
                return 'system';

            default:
                return this.option.format as InternalModuleFormat;
        }
    }

    toJson(): OutputJson {
        return {
            output: this.option
        };
    }
}

export default Output;
