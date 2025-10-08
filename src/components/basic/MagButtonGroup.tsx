import {defineComponent, PropType} from "vue";
import {ElButton} from "element-plus";
import {MagButtonType} from "@/element-mage-types";
import {baseProps} from "@/components/defineBasicComponent";

const MagButtonGroup = defineComponent({
  name: "MagButtonGroup",
  props: {
    ...baseProps,
    formType: {type: Boolean, required: false, default: () => true},
    prop: {type: String as PropType<string>, required: false, default: () => ""},
    label: {type: String, required: false, default: () => ""},
    buttons: {type: Array as PropType<MagButtonType[]>, required: false, default: () => []},
    buttonSpace: {type: Number, required: false, default: () => 8}
  },
  setup(props, {attrs, slots}) {
    /**
     * 定义返回模板
     */
    return () => {
      return props.buttons.length > 0
          ? <div {...props} {...attrs}
                 class="mag-button-group">
            {props.buttons.map((btn: any) => <ElButton {...btn}>{btn.label}</ElButton>)}
          </div>

          : <div {...props} {...attrs}
                 class="mag-button-group">
            {slots?.default?.()}
          </div>
    }
  }
});

export default MagButtonGroup;
