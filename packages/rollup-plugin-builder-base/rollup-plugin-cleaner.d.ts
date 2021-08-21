declare module 'rollup-plugin-cleaner' {
    import { Plugin } from 'rollup';

    interface Parameters {
        targets?: string[];
        silent?: boolean;
    }

    function cleaner(option: Parameters): Plugin;

    export default cleaner;
}
