import {PropType} from "vue";
import {ElmType} from "@/element-mage-types.ts";

const baseProps = {
  type: {type: String as PropType<ElmType>, required: false, default: () => ""},
  dataScope: {type: Object as PropType<any>, required: false, default: () => new Object()},
  span: {type: Number as PropType<number>, required: false, default: () => 1},
  size: {type: String as PropType<string>, required: false, default: () => "default"},
  visibleHandler: {type: Function as PropType<(scope: any) => boolean>, required: false, default: () => true},
}

const baseMethods = {};

export {
  baseProps,
  baseMethods
}
