import {defineComponent} from "vue";
import {ElInput} from "element-plus";
import {baseProps} from "@/components/defineFormComponent";
import MagFlexComponent from "@/components/basic/MagFlexComponent";

const MagInputArea = defineComponent({
  name: "MagInputArea",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "textarea"}
  },
  setup(props, {attrs}) {
    /**
     * 定义返回模板
     */
    return () => {
      if (props.formType) {
        return <ElInput {...props} {...attrs} type="textarea" v-model={props.model[props.prop]}/>
      }

      return <MagFlexComponent {...props} {...attrs}>
        <ElInput  {...props} {...attrs} type="textarea"
                  v-model={props.model[props.prop]}/>
      </MagFlexComponent>
    }
  }
});

export default MagInputArea;
