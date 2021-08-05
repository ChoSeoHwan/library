import Output from "./Output";
import Func from "../types/Func";
interface OptionInterface<OptionJson = unknown> {
    toJson: Func<OptionJson, [Output]>;
}
export default OptionInterface;
