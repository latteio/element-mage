import {defineComponent} from "vue";
import {ElSwitch} from "element-plus";
import {baseProps} from "@/components/defineFormComponent";
import MagFlexComponent from "@/components/basic/MagFlexComponent";

const MagSwitch = defineComponent({
  name: "MagSwitch",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "switch"}
  },
  setup(props, {attrs}) {
    /**
     * 定义返回模板
     */
    return () => {
      if (props.formType) {
        return <ElSwitch {...props} {...attrs} v-model={props.model[props.prop]}/>
      }

      return <MagFlexComponent {...props} {...attrs}>
        <ElSwitch {...props} {...attrs} v-model={props.model[props.prop]}/>
      </MagFlexComponent>
    }
  }
});

export default MagSwitch;
