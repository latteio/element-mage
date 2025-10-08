import {defineComponent, PropType} from "vue";
import {ElSwitch, ElTableColumn} from "element-plus";

const MagTableColumnSwitch = defineComponent({
  name: "MagTableColumnSwitch",
  props: {
    prop: {type: String, required: true, default: () => ""},
    label: {type: String, required: true, default: () => ""},
    activeValue: {type: [Boolean, String, Number], required: false, default: () => 1},
    activeText: {type: String, required: false, default: () => "是"},
    inactiveValue: {type: [Boolean, String, Number], required: false, default: () => 0},
    inactiveText: {type: String, required: false, default: () => "否"},
    beforeChangeHandler: {type: Function as PropType<(val: any, scope: any) => void>, required: false, default: () => true},
    changeHandler: {type: Function as PropType<(val: any, scope: any) => void>, required: false, default: () => null},
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

      return <ElSwitch {...props}
                       inline-prompt
                       v-model={scope.row["" + props.prop]}
                       onBeforeChange={(val: any) => {
                         props.beforeChangeHandler(val, scope)
                       }}
                       onChange={(val: any) => {
                         props.changeHandler && props.changeHandler(val, scope)
                       }}/>
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

export default MagTableColumnSwitch;
