import RollupBuilderError from '~src/errors/RollupBuilderError';

class PluginsError extends RollupBuilderError {
    /**
     * 중복된 플러그인이 있을 경우 에러
     *
     * @param {string[]} pluginNames 중복된 plugin 이름 리스트
     * @returns {PluginsError} error
     */
    static duplicatedPluginName(pluginNames: string[]): PluginsError {
        return new this(
            `duplicated plugin name [${pluginNames.sort().join(', ')}]`
        );
    }

    /**
     * 선언되지 않은 plugin 접근 시 에러
     *
     * @param {string} pluginName 선언되지 않은 plugin 이름
     * @returns {PluginsError} error
     */
    static undefinedPlugin(pluginName: string): PluginsError {
        return new this(`undefined plugin [${pluginName}]`);
    }
}

export default PluginsError;
