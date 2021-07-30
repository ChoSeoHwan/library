import { Plugin as RollupPlugin } from 'rollup';

import PluginsError from '~src/errors/PluginsError';
import { OptionInterface, Output, Plugin } from '~src/option';

interface PluginsJson {
    plugins: RollupPlugin[];
}

class Plugins implements OptionInterface<PluginsJson> {
    private readonly plugins: Plugin[] = [];

    constructor(...plugins: Plugin[]) {
        this.pushPlugin(...plugins);
    }

    /**
     * plugin 추가
     *
     * @param {Plugin[]} plugins plugin
     */
    pushPlugin(...plugins: Plugin[]): void {
        // 중복된 plugin 이름 확인
        this.checkDuplicatedPluginName([...this.plugins, ...plugins]);

        this.plugins.push(...plugins);
    }

    /**
     * 첫번째에 plugin 추가
     *
     * @param {Plugin[]} plugins plugin
     */
    unshiftPlugin(...plugins: Plugin[]): void {
        // 중복된 plugin 이름 확인
        this.checkDuplicatedPluginName([...plugins, ...this.plugins]);

        this.plugins.unshift(...plugins);
    }

    /**
     * 특정 plugin 뒤에 plugin 추가
     *
     * @param {string} name plugin 이름
     * @param {Plugin} plugins plugin list
     */
    appendPlugin(name: string, ...plugins: Plugin[]): void {
        const index = this.getPluginIndex(name);

        // 중복된 plugin 이름 확인
        this.checkDuplicatedPluginName([...this.plugins, ...plugins]);

        // plugin 추가
        this.plugins.splice(index + 1, 0, ...plugins);
    }

    /**
     * 특정 plugin 제거
     *
     * @param {string} name 플러그인 이름
     */
    removePlugin(name: string): void {
        this.plugins.splice(this.getPluginIndex(name), 1);
    }

    /**
     * plugin 이름으로 plugin 조회
     *
     * @param {string} name plugin name
     * @returns {Plugin} plugin list
     * @throws PluginsError
     */
    findPlugin(name: string): Plugin {
        const plugin = this.plugins.find((plugin) => plugin.getName() === name);
        if (!plugin) {
            throw PluginsError.undefinedPlugin(name);
        }

        return plugin;
    }

    /**
     * plugin 리스트 조회
     *
     * @returns {Plugin[]} plugin list
     */
    getPlugins(): Plugin[] {
        return this.plugins;
    }

    toJson(output: Output): PluginsJson {
        const plugins = this.plugins.map((plugin) =>
            plugin.toRollupPlugin(output)
        );
        return {
            plugins
        };
    }

    /**
     * 중복된 plugin 이름 확인
     *
     * @param {Plugin[]} plugins plugin 리스트
     * @throws PluginsError
     */
    private checkDuplicatedPluginName(plugins: Plugin[]) {
        const pluginNames = plugins.map((plugin) => plugin.getName());

        // 중복된 플러그인 이름 확인
        const duplicatedNames = pluginNames.filter(
            (name, index) => pluginNames.indexOf(name) !== index
        );

        if (duplicatedNames.length > 0) {
            throw PluginsError.duplicatedPluginName(duplicatedNames);
        }
    }

    /**
     * plugin index 조회
     *
     * @param {string} name plugin 이름
     * @returns {number} plugin index
     * @throws PluginsError
     */
    private getPluginIndex(name: string): number {
        const index = this.plugins.findIndex(
            (plugin) => plugin.getName() === name
        );

        // 존재하지 않는 plugin
        if (index < 0) {
            throw PluginsError.undefinedPlugin(name);
        }

        return index;
    }
}

export default Plugins;
