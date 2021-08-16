import { RollupOptions } from 'rollup';

import { Input, Output, Plugins } from '~src/option';

const buildRollupOptions = (
    input: Input,
    outputs: Output | Output[],
    plugins?: Plugins
): RollupOptions[] | RollupOptions => {
    console.log('feat: test for ci');

    // output 세팅
    if (!Array.isArray(outputs)) outputs = [outputs];

    // output 에 따른 option 세팅
    const rollupOptions: RollupOptions[] = [];
    outputs.forEach((output) => {
        // input option 세팅
        const inputJson = input.toJson(output);

        // plugins option 세팅
        const pluginsJson = plugins ? plugins.toJson(output) : [];

        rollupOptions.push({
            ...inputJson,
            ...output.toJson(),
            ...pluginsJson
        });
    });

    return rollupOptions.length === 1 ? rollupOptions[0] : rollupOptions;
};

export default buildRollupOptions;
