import {defineComponent, PropType} from "vue";
import {ElTableColumn, ElTag} from "element-plus";
import {ElmType, MagTableColumnTagType} from "@/element-mage-types";
import Objects from "@/utils/Objects";

const MagTableColumnTag = defineComponent({
  name: "MagTableColumnTag",
  props: {
    prop: {type: String, required: true, default: () => ""},
    label: {type: String, required: true, default: () => ""},
    useTag: {type: Boolean, required: false, default: () => false},
    tagData: {type: Array as PropType<MagTableColumnTagType[]>, required: false, default: () => []},
    visibleHandler: {type: Function as PropType<(scope: any) => boolean>, required: false, default: () => true}
  },
  setup(props, {attrs}) {
    /**
     * 定义插槽节点
     * @param scope
     */
    const defaultNode = (scope: any) => {
      if (!props.visibleHandler(scope)) {
        return <></>
      }

      let tagType: ElmType = "info", tagValue = scope.row["" + props.prop], tagColor = "";
      let notNullAndBlackVal = tagValue !== undefined && tagValue !== null && tagValue !== "";
      if (props.useTag && !Objects.isEmpty(props.tagData)) {
        for (let data of props.tagData) {
          if (data.value == tagValue) {
            tagType = data.type || "primary";
            tagValue = data.label || tagValue;
            tagColor = data.color ? data.color : tagColor;
            break;
          }
        }
      }

      return notNullAndBlackVal ? <ElTag type={tagType} color={tagColor}>{tagValue}</ElTag> : ""
    }

    /**
     * 定义返回模板
     */
    return () => {
      return <ElTableColumn {...props} {...attrs} v-slots={{default: defaultNode}}>
      </ElTableColumn>
    }
  }
});

export default MagTableColumnTag;
