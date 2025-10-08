import {PropType} from "vue";

const baseProps = {
  componentType: {type: String as PropType<string>, required: false, default: () => "MagView"},
  name: {type: String as PropType<string>, required: false, default: () => ""},
  region: {type: String as PropType<string>, required: false, default: () => "layout"},
  width: {type: [String, Number] as PropType<string | number>, required: false, default: () => "100%"},
  height: {type: [String, Number] as PropType<string | number>, required: false, default: () => "100%"},
  size: {type: String as PropType<string>, required: false, default: () => "default"},
  space: {type: Number as PropType<number>, required: false, default: () => 0},
  padding: {type: Number as PropType<number>, required: false, default: () => 6},
  visible: {type: Boolean as PropType<boolean>, required: false, default: () => true},
  expanded: {type: Boolean, required: false, default: () => true},
  shadow: {type: Boolean as PropType<boolean>, required: false, default: () => true}
}

const baseMethods = {};

export {
  baseProps,
  baseMethods
}
