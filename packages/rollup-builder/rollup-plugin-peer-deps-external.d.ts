declare module 'rollup-plugin-peer-deps-external' {
    import { Plugin } from 'rollup';

    interface Parameters {
        packageJsonPath?: string;
    }

    function peerDepsExternal(option?: Parameters): Plugin;

    export default peerDepsExternal;
}
