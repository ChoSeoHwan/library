import { RollupOptions } from 'rollup';
import { Input, Output, Plugins } from "./option";
declare const buildRollupOptions: (input: Input, outputs: Output | Output[], plugins?: Plugins | undefined) => RollupOptions[] | RollupOptions;
export default buildRollupOptions;
