import { OutputOptions } from 'rollup';

import Output from '~src/option/Output';

interface BuilderOption extends Omit<OutputOptions, 'format' | 'name'> {}

class OutputBuilder {
    protected readonly option: BuilderOption;

    constructor(option?: BuilderOption) {
        if (!option) option = {};
        this.option = option;
    }

    /**
     * 현재 option 조회
     *
     * @returns {BuilderOption} 현재 option
     */
    getOption(): BuilderOption {
        return this.option;
    }

    /**
     * adm 포맷으로 Output 객체 생성
     *
     * @param {BuilderOption} additionalOption 추가 옵션
     * @returns {Output} 최종 Output 객체
     */
    buildAMD(additionalOption: BuilderOption = {}): Output {
        return this.build({
            ...additionalOption,
            format: 'amd'
        });
    }

    /**
     * cjs 포맷으로 Output 객체 생성
     *
     * @param {BuilderOption} additionalOption 추가 옵션
     * @returns {Output} 최종 Output 객체
     */
    buildCJS(additionalOption: BuilderOption = {}): Output {
        return this.build({
            ...additionalOption,
            format: 'cjs'
        });
    }

    /**
     * ESM 포맷으로 Output 객체 생성
     *
     * @param {BuilderOption} additionalOption 추가 옵션
     * @returns {Output} 최종 Output 객체
     */
    buildES(additionalOption: BuilderOption = {}): Output {
        return this.build({
            ...additionalOption,
            format: 'es'
        });
    }

    /**
     * IIFE 포맷으로 Output 객체 생성
     *
     * @param {string} name 전역 변수로 선언 될 변수 명
     * @param {BuilderOption} additionalOption 추가 옵션
     * @returns {Output} 최종 Output 객체
     */
    buildIIFE(name: string, additionalOption: BuilderOption = {}): Output {
        return this.build({
            ...additionalOption,
            name,
            format: 'iife'
        });
    }

    /**
     * UMD 포맷으로 Output 객체 생성
     *
     * @param {string} name 전역 변수로 선언 될 변수 명
     * @param {BuilderOption} additionalOption 추가 옵션
     * @returns {Output} 최종 Output 객체
     */
    buildUMD(name: string, additionalOption: BuilderOption = {}): Output {
        return this.build({
            ...additionalOption,
            name,
            format: 'umd'
        });
    }

    /**
     * system 포맷으로 Output 객체 생성
     *
     * @param {BuilderOption} additionalOption 추가 옵션
     * @returns {Output} 최종 Output 객체
     */
    buildSystem(additionalOption: BuilderOption = {}): Output {
        return this.build({
            ...additionalOption,
            format: 'system'
        });
    }

    /**
     * 실제 Output 객체 생성
     *
     * @param {OutputOptions} additionalOption 추가 옵션
     * @returns {Output} 최종 Output 객체
     */
    protected build(additionalOption: OutputOptions): Output {
        return new Output({
            ...this.option,
            ...additionalOption
        });
    }
}

export default OutputBuilder;
