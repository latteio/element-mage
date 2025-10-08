import {defineComponent, h, inject} from "vue";
import {ElTableColumn} from "element-plus";
import MagButton from "@/components/basic/MagButton";
import MagDropdown from "@/components/basic/MagDropdown";
import MagConfirmButton from "@/components/basic/MagConfirmButton";
import MagLink from "@/components/basic/MagLink";
import MagEditButton from "@/components/table/MagEditButton";
import MagDeleteButton from "@/components/table/MagDeleteButton";

const MagTableColumnButtons = defineComponent({
  name: "MagTableColumnButtons",
  props: {
    prop: {type: String, required: true, default: () => ""},
    label: {type: String, required: true, default: () => ""},
    buttonSpace: {type: Number, required: false, default: () => 8}
  },
  setup(props, {attrs, slots}) {
    const editableTableVariables: any = inject("mag_table__editable_variables");

    const btnTypes: any = {
      "MagButton": MagButton,
      "MagConfirmButton": MagConfirmButton,
      "MagLink": MagLink,
      "MagEditButton": MagEditButton,
      "MagDeleteButton": MagDeleteButton,
      "MagDropdown": MagDropdown
    };

    const bindButtonRef = (scope: any, btnType: string, el: any) => {
      if (el) {
        const row = scope.row;
        const key = row[editableTableVariables.editableTableRowKey];
        if (key && !editableTableVariables.editableTableRowBtnRefs[key]) {
          editableTableVariables.editableTableRowBtnRefs[key] = {};
          editableTableVariables.editableTableRowBtnRefs[key][btnType] = el;
        }
      }
    }

    /**
     * 定义返回模板
     */
    return () => {
      const defaultNode = (scope: any) => {
        let childNodes: any = slots?.default?.();
        return <div class="mag-button-group">
          {childNodes.map((node: any) => {
                let vNode;
                if (node.type?.name === MagButton.name || node.type?.name === MagConfirmButton.name || node.type?.name === MagLink.name) {
                  let events: any = {};
                  if (node.props?.["onClick"]) {
                    events.onClick = (event: any) => node.props?.["onClick"](event, scope);
                  } else if (node.attrs?.["onClick"]) {
                    events.onClick = (event: any) => node.attrs?.["onClick"](event, scope);
                  }

                  vNode = h(btnTypes[node.type?.name], {
                    ...node.props,
                    ...node.attrs,
                    formType: false,
                    buttonType: true,
                    dataScope: scope,
                    ...events
                  }, {
                    default: () => node?.children?.default()
                  });

                } else if (node.type?.name === MagEditButton.name || node.type?.name === MagDeleteButton.name) {
                  vNode = h(btnTypes[node.type?.name], {
                    ...node.props,
                    ...node.attrs,
                    ref: (el) => {
                      bindButtonRef(scope, node.type?.name, el)
                    },
                    buttonStatus: editableTableVariables.editableTableRowBtnStatus[node.type?.name],
                    dataScope: scope
                  }, {
                    default: () => node?.children?.default()
                  });
                } else if (node.type?.name === MagDropdown.name) {
                  let events: any = {
                    ["item-click"]: (val: any) => {
                      return node.props?.["item-click"] && node.props?.["item-click"](val, scope);
                    }
                  };

                  vNode = h(btnTypes[node.type?.name], {
                    ...node.props,
                    ...node.attrs,
                    formType: false,
                    buttonType: true,
                    dataScope: scope,
                    ...events
                  }, {
                    default: () => node?.children?.default()
                  });
                } else {
                  vNode = node;
                }

                if (!node?.props?.["visible-handler"]) {
                  return vNode;
                } else if (node?.props?.["visible-handler"]
                    && node?.props?.["visible-handler"](scope)) {
                  return vNode;
                } else {
                  return <></>
                }
              }
          )}
        </div>
      }

      return <ElTableColumn {...props} {...attrs} v-slots={{default: defaultNode}}>
      </ElTableColumn>
    }
  }
});

export default MagTableColumnButtons;
