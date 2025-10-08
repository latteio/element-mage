import {defineComponent, h} from "vue";
import {ElIcon, ElTabPane} from "element-plus";
import {baseProps} from "@/components/defineViewComponent";

const MagTab = defineComponent({
  name: "MagTab",
  props: {
    ...baseProps,
    header: {type: String, required: false, default: () => ""},
    icon: {type: [String, Object], required: false, default: () => null},
    name: {type: String, required: true, default: () => "0"}
  },
  setup(props, {attrs, slots}) {

    /**
     * 定义 tab 的图标
     */
    const tabIcon = () => {
      return props.icon
          ? (
              <div class="mag-view__header">
                <ElIcon>
                  {h(props.icon)}
                </ElIcon>
                <span>{props.header}</span>
              </div>
          )
          : <div class="mag-view__header">{props.header}</div>
    }

    /**
     * 定义返回模板
     */
    return () => (
        <ElTabPane {...props} {...attrs} v-slots={{
          label: () => tabIcon()
        }}>
          {slots?.default?.()}
        </ElTabPane>
    )
  }
});

export default MagTab;
