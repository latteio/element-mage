import {defineComponent, PropType, reactive} from "vue";
import {ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElText} from "element-plus";
import {ArrowDown} from "@element-plus/icons-vue";
import {MagDropdownItemType} from "@/element-mage-types";
import {baseProps} from "@/components/defineBasicComponent";
import Objects from "@/utils/Objects";

const MagDropdown = defineComponent({
  name: "MagDropdown",
  props: {
    ...baseProps,
    prop: {type: String as PropType<string>, required: false, default: () => ""},
    label: {type: String, required: false, default: () => ""},
    header: {type: String, required: true, default: () => ""},
    buttonType: {type: Boolean, required: false, default: () => false},
    itemData: {type: Array as PropType<MagDropdownItemType[]>, required: false, default: () => []},
    itemDataProvider: {type: Function as PropType<(scope: any) => Array<any>>, required: false, default: () => []},
    itemClick: {type: Function as PropType<(val: any, scope: any) => void>, required: true, default: () => void (0)}
  },
  setup(props, {attrs}) {
    /**
     * 定义 item 数据项集
     */
    const itemDataInternal = reactive<Array<MagDropdownItemType>>(
        !Objects.isEmpty(props.itemData)
            ? props.itemData
            : props.itemDataProvider(props.dataScope)
    )

    /**
     * 定义返回模板
     */
    return () => {
      let dropdownTemplate = () => {
        return <ElDropdownMenu>
          {itemDataInternal.map((it: MagDropdownItemType) =>
              <ElDropdownItem {...it} command={it.value}>
                {it.label}
              </ElDropdownItem>)}
        </ElDropdownMenu>
      };

      return props.buttonType ?
          <ElDropdown {...props} {...attrs} trigger="click" split-button onCommand={props.itemClick} v-slots={{
            dropdown: dropdownTemplate
          }}>
            {props.header}
          </ElDropdown>

          : <ElDropdown {...props} {...attrs} trigger="click" onCommand={props.itemClick} v-slots={{
            dropdown: dropdownTemplate
          }}>
            <ElText {...props} {...attrs}>
              {props.header}<ElIcon class="el-icon--right"><ArrowDown/></ElIcon>
            </ElText>
          </ElDropdown>
    }
  }
});

export default MagDropdown;
