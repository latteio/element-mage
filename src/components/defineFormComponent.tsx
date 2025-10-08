import {PropType} from "vue";

const baseProps = {
  formType: {type: Boolean as PropType<boolean>, required: false, default: () => true},
  model: {type: Object as PropType<any>, required: false, default: () => new Object()},
  type: {type: String as PropType<string>, required: false, default: () => ""},
  prop: {type: String as PropType<string>, required: true, default: () => ""},
  label: {type: String as PropType<string>, required: false, default: () => ""},
  span: {type: Number as PropType<number>, required: false, default: () => 1},
  size: {type: String as PropType<string>, required: false, default: () => "default"},
  dataScope: {type: Object as PropType<any>, required: false, default: () => new Object()},
  visibleHandler: {type: Function as PropType<(scope: any) => boolean>, required: false, default: () => true}
}

const baseMethods = {};

export {
  baseProps,
  baseMethods
}
