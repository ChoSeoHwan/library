import RollupBuilderError from "./RollupBuilderError";
declare class OutputError extends RollupBuilderError {
    /**
     * dir 와 file 이 선언되지 않았을 경우 에러
     *
     * @returns {OutputError} error
     */
    static undefinedOutputPath(): OutputError;
    /**
     * dir 와 file 이 같이 선언되어 있을 경우 에레
     *
     * @returns {OutputError} error
     */
    static redundantOutputPath(): OutputError;
    /**
     * iife/umd 포맷 사용 시 name 을 지정하지 않았을 경우 에러
     *
     * @returns {OutputError} error
     */
    static undefinedName(): OutputError;
}
export default OutputError;
