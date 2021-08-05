import { Plugin as RollupPlugin } from 'rollup';
import { OptionInterface, Output, Plugin } from "./";
interface PluginsJson {
    plugins: RollupPlugin[];
}
declare class Plugins implements OptionInterface<PluginsJson> {
    private readonly plugins;
    constructor(...plugins: Plugin[]);
    /**
     * plugin 추가
     *
     * @param {Plugin[]} plugins plugin
     */
    pushPlugin(...plugins: Plugin[]): void;
    /**
     * 첫번째에 plugin 추가
     *
     * @param {Plugin[]} plugins plugin
     */
    unshiftPlugin(...plugins: Plugin[]): void;
    /**
     * 특정 plugin 뒤에 plugin 추가
     *
     * @param {string} name plugin 이름
     * @param {Plugin} plugins plugin list
     */
    appendPlugin(name: string, ...plugins: Plugin[]): void;
    /**
     * 특정 plugin 제거
     *
     * @param {string} name 플러그인 이름
     */
    removePlugin(name: string): void;
    /**
     * plugin 이름으로 plugin 조회
     *
     * @param {string} name plugin name
     * @returns {Plugin} plugin list
     * @throws PluginsError
     */
    findPlugin(name: string): Plugin;
    /**
     * plugin 리스트 조회
     *
     * @returns {Plugin[]} plugin list
     */
    getPlugins(): Plugin[];
    toJson(output: Output): PluginsJson;
    /**
     * 중복된 plugin 이름 확인
     *
     * @param {Plugin[]} plugins plugin 리스트
     * @throws PluginsError
     */
    private checkDuplicatedPluginName;
    /**
     * plugin index 조회
     *
     * @param {string} name plugin 이름
     * @returns {number} plugin index
     * @throws PluginsError
     */
    private getPluginIndex;
}
export default Plugins;
