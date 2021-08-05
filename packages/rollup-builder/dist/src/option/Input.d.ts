import { InputOption, InternalModuleFormat } from 'rollup';
import OptionInterface from "./OptionInterface";
import Output from "./Output";
declare type Inputs = Partial<Record<InternalModuleFormat, InputOption>>;
interface InputJson {
    input: InputOption;
}
/**
 * input option class of rollup config
 */
declare class Input implements OptionInterface<InputJson> {
    private readonly main;
    private readonly inputs;
    constructor(main: InputOption, inputs?: Inputs);
    toJson(output: Output): InputJson;
}
export default Input;
