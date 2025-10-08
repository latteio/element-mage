import {defineComponent, PropType} from "vue";
import {ElInput} from "element-plus";
import {baseProps} from "@/components/defineFormComponent";
import MagFlexComponent from "@/components/basic/MagFlexComponent";

const MagHidden = defineComponent({
  name: "MagHidden",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "hidden"},
    prop: {type: String, required: false, default: () => ""},
    visibleHandler: {type: Function as PropType<(scope: any) => boolean>, required: false, default: () => false}
  },
  setup(props, {attrs}) {
    /**
     * 定义返回模板
     */
    return () => {
      if (props.formType) {
        return (props.model && props.prop)
            ? <ElInput {...props} {...attrs} v-model={props.model[props.prop]} style="display: none;"/>
            : <div {...props} {...attrs} style="display: none;"/>
      }

      return <MagFlexComponent {...props} {...attrs}>
        (props.model && props.prop)
        ? <ElInput {...props} {...attrs} v-model={props.model[props.prop]} style="display: none;"/>
        : <div {...props} {...attrs} style="display: none;"/>
      </MagFlexComponent>
    }
  }
});

export default MagHidden;
