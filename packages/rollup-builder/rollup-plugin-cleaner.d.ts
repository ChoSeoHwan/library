declare module 'rollup-plugin-cleaner' {
    import { Plugin } from 'rollup';

    interface CleanerOption {
        targets?: string[];
        silent?: boolean;
    }

    function cleaner(option: CleanerOption): Plugin;

    export default cleaner;
}
