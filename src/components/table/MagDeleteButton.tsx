import {defineComponent, h, inject, PropType, ref} from "vue";
import {ElButton} from "element-plus";
import {baseProps} from "@/components/defineBasicComponent";

const MagDeleteButton = defineComponent({
  name: "MagDeleteButton",
  props: {
    ...baseProps,
    buttonStatus: {type: String as PropType<string>, required: false, default: () => "delete"}
  },
  setup(props, {attrs, slots}) {
    const editableTableVariables: any = inject("mag_table__editable_variables");
    const editableTableRowOpt = ref(props.buttonStatus || "delete");

    /**
     * 定义删除行事件处理方法
     * @param scope
     */
    const handleDeleteEvent = (scope: any) => {
      const row = scope.row;
      editableTableVariables.editableTableEvents.delRow(row);
      editableTableRowOpt.value = "deleted";
    }

    /**
     * 定义返回模板
     */
    return () => {
      return h(ElButton,
          {
            ...props as any,
            ...attrs as any,
            type: "danger",
            onClick: function () {
              handleDeleteEvent(props.dataScope)
            }
          }, {
            default: () => slots?.default?.()
          });
    }
  }
});

export default MagDeleteButton;
