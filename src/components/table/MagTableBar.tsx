import {defineComponent, h} from "vue";

const MagTableBar = defineComponent({
  name: "MagTableBar",
  props: {
    position: {type: String, required: false, default: () => "top"},
    align: {type: String, required: false, default: () => "left"}
  },
  setup(props, {attrs, slots}) {

    /**
     * 定义返回模板
     */
    return () => {
      let childBars: any = slots?.default?.();
      return <div {...props} {...attrs} class="mag-button-group">
        {childBars.map((bar: any) => h(bar, {formType: false}))}
      </div>
    }
  }
});

export default MagTableBar;
