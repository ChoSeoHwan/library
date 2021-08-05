import { Plugin as RollupPlugin } from 'rollup';
import Output from "./Output";
import Func from "../types/Func";
declare type ArgumentTypes<F> = F extends (...args: infer A) => unknown ? A : [];
declare type PluginCreatorType = Func<RollupPlugin>;
declare type PluginOptions<F> = ArgumentTypes<F> | ((output: Output) => ArgumentTypes<F>);
declare class Plugin<PluginCreator extends PluginCreatorType = PluginCreatorType> {
    private readonly name;
    private readonly creator;
    private options;
    constructor(name: string, method: PluginCreator, options: PluginOptions<PluginCreator>);
    /**
     * plugin 이름 조회
     *
     * @returns {string} plugin 이름
     */
    getName(): string;
    /**
     * 현재 설정된 option 조회
     *
     * @returns {PluginOptions} 현재 option
     */
    getOptions(): PluginOptions<PluginCreator>;
    /**
     * option 설정
     *
     * @param {PluginOptions} options 변경할 option
     */
    setOptions(options: PluginOptions<PluginCreator>): void;
    /**
     * rollup plugin 으로 변환
     *
     * @param {Output} output 변환할 output 객체
     * @returns {Plugin} rollup plugin
     */
    toRollupPlugin(output: Output): RollupPlugin;
}
export default Plugin;
