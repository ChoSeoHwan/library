declare type Func<ReturnType, ArgumentTypes extends any[] = any[]> = (...args: ArgumentTypes) => ReturnType;
export default Func;
