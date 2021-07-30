class RollupBuilderError extends Error {
    name = 'RollupBuilderError';

    constructor(message: string) {
        super('Rollup Builder Error: ' + message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, new.target);
        }

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default RollupBuilderError;
