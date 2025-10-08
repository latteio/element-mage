import {defineComponent, PropType} from "vue";
import {ElDivider} from "element-plus";
import {baseProps} from "@/components/defineBasicComponent";

const MagDivider = defineComponent({
  name: "MagDivider",
  props: {
    ...baseProps,
    formType: {type: Boolean, required: false, default: () => false},
    prop: {type: String as PropType<string>, required: false, default: () => ""},
    label: {type: String, required: false, default: () => ""},
  },
  setup(props, {attrs, slots}) {
    /**
     * 定义返回模板
     */
    return () => {
      return <ElDivider {...props} {...attrs}>
        {slots?.default?.()}
      </ElDivider>
    }
  }
});

export default MagDivider;
