import {defineComponent} from "vue";
import {ElButton, ElInput} from "element-plus";
import {Upload} from "@element-plus/icons-vue";
import {baseProps} from "@/components/defineFormComponent";
import MagFlexComponent from "@/components/basic/MagFlexComponent";

const MagUpload = defineComponent({
  name: "MagUpload",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "input-upload"},
    icon: {type: [String, Object], required: false, default: () => ""}
  },
  emits: ["click"],
  setup(props, {attrs, emit}) {
    /**
     * 定义附件按钮事件
     */
    const appendBtnClick = (event: MouseEvent) => {
      emit("click", event, props.dataScope);
    }

    /**
     * 定义附件按钮
     */
    const appendBtn = () => {
      return <ElButton icon={props.icon || Upload} onClick={appendBtnClick}/>
    }

    /**
     * 定义返回模板
     */
    return () => {
      if (props.formType) {
        return <ElInput {...props} {...attrs} v-model={props.model[props.prop]}
                        v-slots={{append: () => appendBtn()}}
        />
      }

      return <MagFlexComponent {...props} {...attrs}>
        <ElInput {...props} {...attrs} v-model={props.model[props.prop]}
                 v-slots={{append: () => appendBtn()}}
        />
      </MagFlexComponent>
    }
  }
});

export default MagUpload;
