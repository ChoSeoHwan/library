import RollupBuilderError from '~src/errors/RollupBuilderError';

class OutputError extends RollupBuilderError {
    /**
     * dir 와 file 이 선언되지 않았을 경우 에러
     *
     * @returns {OutputError} error
     */
    static undefinedOutputPath(): OutputError {
        return new this(
            "'dir' and 'file' are not declared. Either one requires a declaration."
        );
    }

    /**
     * dir 와 file 이 같이 선언되어 있을 경우 에레
     *
     * @returns {OutputError} error
     */
    static redundantOutputPath(): OutputError {
        return new this(
            `'dir' and 'file' are declared redundant. Only one of the two must be declared.`
        );
    }

    /**
     * iife/umd 포맷 사용 시 name 을 지정하지 않았을 경우 에러
     *
     * @returns {OutputError} error
     */
    static undefinedName(): OutputError {
        return new this(`Undefined name when using iife or umd formats.`);
    }
}

export default OutputError;
