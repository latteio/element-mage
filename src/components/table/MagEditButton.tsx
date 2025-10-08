import {defineComponent, h, inject, PropType, ref} from "vue";
import {ElButton} from "element-plus";
import {baseProps} from "@/components/defineBasicComponent";

const MagEditButton = defineComponent({
  name: "MagEditButton",
  props: {
    ...baseProps,
    buttonStatus: {type: String as PropType<string>, required: false, default: () => "edit"}
  },
  emits: ["save"],
  setup(props, {attrs, slots, emit, expose}) {
    const editableTableVariables: any = inject("mag_table__editable_variables");
    const editableTableRowOpt = ref(props.buttonStatus || "edit");

    /**
     * 定义开始编辑事件处理方法
     * @param scope
     */
    const handleEditEvent = (scope: any) => {
      const row = scope.row;
      editableTableVariables.editableTableEvents.editRow(row, false);
      editableTableRowOpt.value = "editing";
    }

    /**
     * 定义取消编辑事件处理方法
     * @param scope
     */
    const handleCancelEvent = (scope: any) => {
      const row = scope.row;
      editableTableVariables.editableTableEvents.cancelEdit(row, false);
      editableTableRowOpt.value = "edit";
    }

    /**
     * 定义保存编辑事件处理方法
     * @param scope
     */
    const handleSaveEvent = (scope: any) => {
      const row = scope.row;
      const key = row[editableTableVariables.editableTableRowKey];
      const type = editableTableVariables.editableTableModifiedRowData [key]["type"];
      const data = {...editableTableVariables.editableTableModifiedRowData [key]["data"]};
      const modified = editableTableVariables.editableTableModifiedRowData [key]["modified"];
      delete editableTableVariables.editableTableModifiedRowData [key];
      editableTableRowOpt.value = "edit";
      modified && emit("save", scope, {type, data});
    }

    expose({
      setButtonStatus: (statusText: string) => editableTableRowOpt.value = statusText
    });

    /**
     * 定义返回模板
     */
    return () => {
      return editableTableRowOpt.value == "edit"
          ? h('div', {class: "mag-button-subgroup"},
              [
                h(ElButton,
                    {
                      ...props as any,
                      ...attrs as any,
                      type: "primary",
                      onClick: function () {
                        handleEditEvent(props.dataScope)
                      }
                    }, {
                      default: () => slots?.default?.()
                    })
              ])
          : h('div', {class: "mag-button-subgroup"},
              [
                h(ElButton,
                    {
                      ...props as any,
                      ...attrs as any,
                      onClick: function () {
                        handleCancelEvent(props.dataScope)
                      }
                    }, "取消"),
                h(ElButton,
                    {
                      ...props as any,
                      ...attrs as any,
                      type: "primary",
                      onClick: function () {
                        handleSaveEvent(props.dataScope)
                      }
                    }, "保存")
              ])
    }
  }
});

export default MagEditButton;
