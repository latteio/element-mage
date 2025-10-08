import {defineComponent} from "vue";
import {ElInputTag} from "element-plus";
import {baseProps} from "@/components/defineFormComponent";
import MagFlexComponent from "@/components/basic/MagFlexComponent";

const MagInputTag = defineComponent({
  name: "MagInputTag",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "input-tag"}
  },
  setup: function (props, {attrs}) {
    /**
     * 定义返回模板
     */
    return () => {
      if (props.formType) {
        return <ElInputTag {...props} {...attrs} v-model={props.model[props.prop]}/>
      }

      return <MagFlexComponent {...props} {...attrs}>
        <ElInputTag {...props} {...attrs} v-model={props.model[props.prop]}/>
      </MagFlexComponent>
    }
  }
});

export default MagInputTag;
