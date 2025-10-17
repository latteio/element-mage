import {defineComponent, PropType} from "vue";
import {baseProps} from "@/components/defineBasicComponent";

const MagTitle = defineComponent({
  name: "MagTitle",
  props: {
    ...baseProps,
    formType: {type: Boolean, required: false, default: () => false},
    title: {type: String, required: true, default: () => ""},
    subTitle: {type: String, required: false, default: () => ""},
    subType: {type: String, required: false, default: () => "primary"},
    fontSize: {type: Number, required: false, default: () => 24},
    fontWeight: {type: String, required: false, default: () => "normal"},
    height: {type: Number as PropType<number>, required: false, default: () => -1}
  },
  setup(props, {attrs}) {
    /**
     * 定义返回模板
     */
    return () => {
      return <div {...attrs} class="mag-title" style={`height: ${props.height > 0 ? (props.height + "px;") : "auto;"}`}>
        <div class={`mag-title__main-title mag-font-size-${props?.fontSize} mag-font-weight-${props?.fontWeight}`}>
          {props?.title}
        </div>
        {
            props?.subTitle && (
                <div class={`mag-title__sub-title mag-title__sub-title-${props?.subType} mag-font-size-${props?.fontSize - 8} mag-font-weight-${props?.fontWeight}`}>
                  {props?.subTitle}
                </div>
            )
        }
      </div>
    }
  }
});

export default MagTitle;
