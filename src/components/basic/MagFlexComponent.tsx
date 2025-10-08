import {defineComponent, PropType} from "vue";
import {baseProps} from "@/components/defineBasicComponent";

const MagFlexComponent = defineComponent({
  name: "MagFlexComponent",
  props: {
    ...baseProps,
    formType: {type: Boolean, required: false, default: () => false},
    prop: {type: String as PropType<string>, required: false, default: () => ""},
    label: {type: String, required: false, default: () => ""},
    labelWidth: {type: [String, Number], required: false, default: () => "auto"}
  },
  setup(props, {attrs, slots}) {
    /**
     * 动态计算组件label宽度
     */
    const calcLabelWidth = () => {
      let labelWidth: string | number = "0";
      if (props.label) {
        if (props.labelWidth === "auto") {
          labelWidth = "auto";
        } else {
          labelWidth = String(props.labelWidth).endsWith("px") ? props.labelWidth : (props.labelWidth + "px");
        }
      }

      return labelWidth;
    }

    /**
     * 定义返回模板
     */
    return () => {
      return <div class="mag-flex-component" {...props} {...attrs}>
        <div class={`mag-flex-component__label mag-flex-component__label_${props.size}`} style={`width: ${calcLabelWidth()};`}>
          {props.label}
        </div>
        <div class={`mag-flex-component__compo mag-flex-component__compo_${props.size}`}>
          {slots?.default?.()}
        </div>
      </div>
    }
  }
});

export default MagFlexComponent;
