import {defineComponent, inject, PropType} from "vue";
import {ElTableColumn} from "element-plus";
import MagInput from "@/components/form/MagInput";
import MagInputNumber from "@/components/form/MagInputNumber";
import MagInputTag from "@/components/form/MagInputTag";
import MagInputButton from "@/components/form/MagInputButton";
import MagSelect from "@/components/form/MagSelect";
import MagSelectDate from "@/components/form/MagSelectDate";
import MagSelectTime from "@/components/form/MagSelectTime";
import MagSelectTable from "@/components/form/MagSelectTable";
import MagSelectTree from "@/components/form/MagSelectTree";
import MagSwitch from "@/components/form/MagSwitch";

const MagTableColumn = defineComponent({
  name: "MagTableColumn",
  props: {
    prop: {type: String, required: true, default: () => ""},
    label: {type: String, required: true, default: () => ""},
    editable: {type: Boolean as PropType<boolean>, required: false, default: () => false}
  },
  setup(props, {attrs}) {
    const editableTableVariables: any = inject("mag_table__editable_variables");

    /**
     * 定义组件值被改变事件
     * @param scope
     * @param column
     */
    const onComponentChange = (scope: any, column: any) => {
      const row = scope.row;
      const key = row[editableTableVariables.editableTableRowKey];
      if (editableTableVariables.editableTableModifiedRowData [key]) {
        editableTableVariables.editableTableModifiedRowData [key]["modified"] = true;
      }
    }

    /**
     * 渲染表格单元格
     * @param scope
     * @param column
     */
    const renderTableColumnCell = (scope: any, column: any) => {
      const row = scope.row;
      const prop = column.prop;
      if (editableTableVariables.editableTable) {
        const key = row[editableTableVariables.editableTableRowKey];
        if (!key
            || !editableTableVariables.editableTableColumns[prop]
            || !editableTableVariables.editableTableModifiedRowData[key]) {
          return;
        }

        let vNode = editableTableVariables.editableTableColumns[prop]["node"];
        switch (vNode?.type?.name) {
          case MagInput.name:
            return <MagInput
                {...vNode?.props}
                {...vNode?.attrs}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.default?.()}
            </MagInput>
          case MagInputNumber.name:
            return <MagInputNumber
                {...vNode?.props}
                {...vNode?.attrs}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.default?.()}
            </MagInputNumber>
          case MagInputTag.name:
            return <MagInputTag
                {...vNode?.props}
                {...vNode?.attrs}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.default?.()}
            </MagInputTag>
          case MagInputButton.name:
            return <MagInputButton
                {...vNode?.props}
                {...vNode?.attrs}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.default?.()}
            </MagInputButton>
          case MagSelect.name:
            return <MagSelect
                {...vNode?.props}
                {...vNode?.attrs}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.default?.()}
            </MagSelect>
          case MagSelectDate.name:
            return <MagSelectDate
                {...vNode?.props}
                {...vNode?.attrs}
                fit={true}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.default?.()}
            </MagSelectDate>
          case MagSelectTime.name:
            return <MagSelectTime
                {...vNode?.props}
                {...vNode?.attrs}
                fit={true}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.default?.()}
            </MagSelectTime>
          case MagSelectTable.name:
            return <MagSelectTable
                {...vNode?.props}
                {...vNode?.attrs}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.children?.default?.()}
            </MagSelectTable>
          case MagSelectTree.name:
            return <MagSelectTree
                {...vNode?.props}
                {...vNode?.attrs}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.default?.()}
            </MagSelectTree>
          case MagSwitch.name:
            return <MagSwitch
                {...vNode?.props}
                {...vNode?.attrs}
                formType={true}
                model={editableTableVariables.editableTableModifiedRowData[key]["data"]}
                prop={prop}
                onChange={function () {
                  onComponentChange(scope, column)
                }}>
              {vNode?.default?.()}
            </MagSwitch>
          default:
            return <span>{row[column.prop]}</span>
        }
      } else {
        return <span>{row[column.prop]}</span>
      }
    }

    /**
     * 定义返回模板
     */
    return () => {
      return <ElTableColumn {...props} {...attrs}
                            v-slots={{
                              default: (scope: any) =>
                                  renderTableColumnCell(scope, props)
                            }}/>
    }
  }
});

export default MagTableColumn;
