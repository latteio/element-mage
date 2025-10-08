import {defineComponent, h, PropType, ref} from "vue";
import {ElButton} from "element-plus";
import {baseProps} from "@/components/defineBasicComponent";

const MagButton = defineComponent({
  name: "MagButton",
  props: {
    ...baseProps,
    formType: {type: Boolean, required: false, default: () => true},
    prop: {type: String as PropType<string>, required: false, default: () => ""},
    label: {type: String, required: false, default: () => ""},
    onClick: {
      type: Function as PropType<(e: MouseEvent) => Promise<void> | void>,
      required: false
    }
  },
  emits: ["click"],
  setup(props, {attrs, slots}) {
    const loadingStatus = ref(false);

    const handleClick = async (event: MouseEvent) => {
      event && event.stopPropagation();
      if (loadingStatus.value) return;
      loadingStatus.value = true;
      try {
        /* 执行定义点击事件 */
        const onClickInternal: any = props?.onClick || attrs?.onClick;
        onClickInternal && await onClickInternal(event);
      } finally {
        loadingStatus.value = false;
      }
    }

    /**
     * 定义返回模板
     */
    return () => {
      return h(ElButton,
          {
            ...props as any,
            ...attrs as any,
            loading: loadingStatus.value,
            onClick: handleClick
          }, {
            default: () => slots?.default?.()
          });
    }
  }
});

export default MagButton;
