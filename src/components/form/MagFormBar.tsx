import {defineComponent, h} from "vue";

const MagFormBar = defineComponent({
  name: "MagFormBar",
  props: {
    position: {type: String, required: false, default: () => "top"},
    align: {type: String, required: false, default: () => "center"}
  },
  setup(props, {attrs, slots}) {
    /**
     * 定义返回模板
     */
    return () => {
      const childBars: any = slots?.default?.();
      return <div {...props} {...attrs}
                  class="mag-button-group">
        {childBars.map((bar: any) => h(bar, {formType: false}))}
      </div>
    }
  }
});

export default MagFormBar;
