import {defineComponent, ref} from "vue";
import {uuid} from "vue3-uuid";
import {baseProps} from "@/components/defineViewComponent";
import Objects from "@/utils/Objects";

const MagStackLayout = defineComponent({
  name: "MagStackLayout",
  props: {...baseProps},
  setup(props, {attrs, slots}) {
    const componentVisible = ref(props.visible);
    const stackRef = ref();

    /**
     * 定义返回模板
     */
    return () => {
      let stackStyles = [];
      let parsedValue = Objects.parsePropertyValue(props.width);
      if (!parsedValue.isPercentage && !parsedValue.isPixel) {
        throw new Error(`width属性值无效: ${props.width}`);
      }
      if (parsedValue.isPercentage || parsedValue.isPixel) {
        stackStyles.push(`width: ${parsedValue.value}${parsedValue.unit};`);
      }

      let stackItemName;
      const stackItemNodes = slots?.default?.() || [];
      return <div {...props}
                  {...attrs}
                  ref={stackRef}
                  v-show={componentVisible.value}
                  class={{
                    "mag-view-stack-layout": true,
                    "is-contentful": props.width === "100%"
                  }}
                  style={stackStyles.join(" ")}>
        {stackItemNodes.map((item) => {
          stackItemName = item?.props?.name || "mag-stack-item__" + uuid.v4();

          return typeof (item.type) !== 'symbol'
              && (<div class="mag-stack-item"
                       style={props.space > 0 ? `margin-top: ${props.space}px;` : ""}
                       data-name={stackItemName}
                  >
                    {item}
                  </div>
              )
        })}
      </div>
    }
  }
});

export default MagStackLayout;
