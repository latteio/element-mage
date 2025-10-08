import {defineComponent} from "vue";
import {ElInputNumber} from "element-plus";
import {baseProps} from "@/components/defineFormComponent";
import MagFlexComponent from "@/components/basic/MagFlexComponent";

const MagInputNumber = defineComponent({
  name: "MagInputNumber",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "input-number"}
  },
  setup(props, {attrs}) {
    /**
     * 定义返回模板
     */
    return () => {
      if (props.formType) {
        return <ElInputNumber {...props} {...attrs} v-model={props.model[props.prop]}/>
      }

      return <MagFlexComponent {...props} {...attrs}>
        <ElInputNumber {...props} {...attrs} v-model={props.model[props.prop]}/>
      </MagFlexComponent>
    }
  }
});

export default MagInputNumber;
