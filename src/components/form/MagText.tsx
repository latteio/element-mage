import {defineComponent} from "vue";
import {ElText} from "element-plus";
import {baseProps} from "@/components/defineFormComponent";

const MagText = defineComponent({
  name: "MagText",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "plain-text"},
    prop: {type: String, required: false, default: () => ""},
    fontSize: {type: Number, required: false, default: () => 14}
  },
  setup(props, {attrs, slots}) {
    /**
     * 定义返回模板
     */
    return () => {
      return <ElText {...props} {...attrs} class={`mag-font-size-${props.fontSize}`}>
        {props?.model && props?.prop ? props?.model[props?.prop] : slots?.default?.()}
      </ElText>
    }
  }
});

export default MagText;
