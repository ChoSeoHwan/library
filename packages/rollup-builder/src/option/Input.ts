import { InputOption, InternalModuleFormat } from 'rollup';

import OptionInterface from '~src/option/OptionInterface';
import Output from '~src/option/Output';

type Inputs = Partial<Record<InternalModuleFormat, InputOption>>;

interface InputJson {
    input: InputOption;
}

/**
 * input option class of rollup config
 */
class Input implements OptionInterface<InputJson> {
    private readonly main: InputOption;
    private readonly inputs: Inputs = {} as Inputs;

    constructor(main: InputOption, inputs?: Inputs) {
        this.main = main;
        if (inputs) this.inputs = inputs;
    }

    toJson(output: Output): InputJson {
        const input = this.inputs[output.getFormat()] || this.main;
        return {
            input
        };
    }
}

export default Input;
