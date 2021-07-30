// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func<ReturnType, ArgumentTypes extends any[] = any[]> = (
    ...args: ArgumentTypes
) => ReturnType;

export default Func;
