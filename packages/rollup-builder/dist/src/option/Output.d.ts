import { InternalModuleFormat, OutputOptions } from 'rollup';
import OptionInterface from "./OptionInterface";
interface OutputJson {
    output: OutputOptions;
}
declare class Output implements OptionInterface<OutputJson> {
    private readonly option;
    constructor(option: OutputOptions);
    /**
     * 현재 option 조회
     *
     * @returns {OutputOptions} 현재 option
     */
    getOption(): OutputOptions;
    /**
     * 등록된 dir 및 file 경로로 output dir 경로 조회
     *
     * @returns {string} output dir 경로
     * @throws OutputError
     */
    getOutputDir(): string;
    /**
     * 현재 output 의 format 조회
     *
     * @returns {InternalModuleFormat} 현재 format (alias 는 원본으로 전달)
     */
    getFormat(): InternalModuleFormat;
    toJson(): OutputJson;
}
export default Output;
