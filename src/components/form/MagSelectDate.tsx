import {defineComponent} from "vue";
import {ElDatePicker} from "element-plus";
import {baseProps} from "@/components/defineFormComponent";
import MagFlexComponent from "@/components/basic/MagFlexComponent";

const MagSelectDate = defineComponent({
  name: "MagSelectDate",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "date"},
    fit: {type: Boolean, required: false, default: () => true}
  },
  setup(props, {attrs}) {
    /**
     * 定义返回模板
     */
    return () => {
      const fitStyle = props.fit ? "width: 100%;" : "";
      if (props.formType) {
        return <ElDatePicker {...props}
                             {...attrs}
                             type={props.type}
                             v-model={props.model[props.prop]}
                             value-format="YYYY-MM-DDTHH:mm:ss"
                             style={fitStyle}/>
      }

      return <MagFlexComponent {...props} {...attrs}>
        <ElDatePicker
            {...props}
            {...attrs}
            type={props.type}
            v-model={props.model[props.prop]}
            value-format="YYYY-MM-DDTHH:mm:ss"/>
      </MagFlexComponent>
    }
  }
});

export default MagSelectDate;
