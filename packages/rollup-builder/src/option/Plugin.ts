import { Plugin as RollupPlugin } from 'rollup';

import Output from '~src/option/Output';
import Func from '~src/types/Func';

type ArgumentTypes<F> = F extends (...args: infer A) => unknown ? A : [];

type PluginCreatorType = Func<RollupPlugin>;

type PluginOptions<F> =
    | ArgumentTypes<F>
    | ((output: Output) => ArgumentTypes<F>);

class Plugin<PluginCreator extends PluginCreatorType = PluginCreatorType> {
    private readonly name: string;

    private readonly creator: PluginCreator;
    private options: PluginOptions<PluginCreator>;

    constructor(
        name: string,
        method: PluginCreator,
        options: PluginOptions<PluginCreator>
    ) {
        this.name = name;
        this.creator = method;
        this.options = options;
    }

    /**
     * plugin 이름 조회
     *
     * @returns {string} plugin 이름
     */
    getName(): string {
        return this.name;
    }

    /**
     * 현재 설정된 option 조회
     *
     * @returns {PluginOptions} 현재 option
     */
    getOptions(): PluginOptions<PluginCreator> {
        return this.options;
    }

    /**
     * option 설정
     *
     * @param {PluginOptions} options 변경할 option
     */
    setOptions(options: PluginOptions<PluginCreator>): void {
        this.options = options;
    }

    /**
     * rollup plugin 으로 변환
     *
     * @param {Output} output 변환할 output 객체
     * @returns {Plugin} rollup plugin
     */
    toRollupPlugin(output: Output): RollupPlugin {
        const options =
            typeof this.options === 'function'
                ? this.options(output)
                : this.options;

        return this.creator(...options);
    }
}

export default Plugin;
