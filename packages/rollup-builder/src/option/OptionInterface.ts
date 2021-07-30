import Output from '~src/option/Output';
import Func from '~src/types/Func';

interface OptionInterface<OptionJson = unknown> {
    toJson: Func<OptionJson, [Output]>;
}

export default OptionInterface;
