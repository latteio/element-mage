import {defineComponent, PropType} from "vue";
import {ElLink} from "element-plus";
import {baseProps} from "@/components/defineBasicComponent";

const MagLink = defineComponent({
  name: "MagLink",
  props: {
    ...baseProps,
    formType: {type: Boolean, required: false, default: () => true},
    prop: {type: String as PropType<string>, required: false, default: () => ""},
    label: {type: String, required: false, default: () => ""},
  },
  setup(props, {attrs, slots}) {
    /**
     * 定义返回模板
     */
    return () => {
      return <ElLink {...props} {...attrs} underline="never">
        {slots?.default?.()}
      </ElLink>
    }
  }
});

export default MagLink;
