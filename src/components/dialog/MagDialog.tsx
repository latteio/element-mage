import {defineComponent, nextTick, PropType, ref, watch} from "vue";
import {ElDialog} from "element-plus";
import {MagDialogModel} from "@/element-mage-types";
import MagButton from "@/components/basic/MagButton";

const MagDialog = defineComponent({
  name: "MagDialog",
  props: {
    model: {
      type: Object as PropType<MagDialogModel>,
      required: true,
      default: {
        visible: false,
        appendToBody: false,
        fullscreen: false,
        header: '',
        headerAlign: 'left',
        width: '60vw',
        height: '40vh',
        url: '',
        footerAlign: 'right',
        showConfirmBtn: true,
        showCancelBtn: true,
        mode: '',
        data: {},
        onClose: () => {
        }
      }
    },
    description: {type: String, required: false, default: () => "对话框描述"}
  },
  emits: ["update:visible", "dialogReady", "dialogConfirm", "dialogCancel"],
  setup(props, {attrs, emit, expose, slots}) {
    const componentVisible = ref(props.model.visible);

    /**
     *  监听 props.model.visible 变化
     */
    watch(() => props.model.visible, (val) => {
      componentVisible.value = val;
    });

    /**
     * 监听本地visible变化
     */
    watch(componentVisible, (val) => {
      if (!val) {
        emit("update:visible", false);
      } else {
        nextTick(() => {
          emit("dialogReady", props.model.mode, props.model.data);
        }).then(() => {
        })
      }
    });

    /**
     * 动态计算对话框body的高度
     */
    const calcDialogBodyHeight = () => {
      if (props.model.fullscreen) {
        if (props.model.showConfirmBtn || props.model.showCancelBtn) {
          return "calc(100vh - 110px)";
        }

        return "calc(100vh - 65px)";
      }

      return (props.model.height || "40vh");
    }

    /**
     * 定义对话框初始化方法
     */
    const onInitDialog = () => {
      props.model.visible = props.model.visible || false;
      props.model.appendToBody = props.model.appendToBody || false;
      props.model.fullscreen = props.model.fullscreen || false;
      props.model.header = props.model.header || "";
      props.model.headerAlign = props.model.headerAlign || "left";
      props.model.width = props.model.fullscreen ? "100vw" : (props.model.width || "60vw");
      props.model.height = calcDialogBodyHeight();
      props.model.url = props.model.url || ""
      props.model.footerAlign = props.model.footerAlign || "right";
      props.model.showConfirmBtn = (props.model.showConfirmBtn !== false);
      props.model.showCancelBtn = (props.model.showCancelBtn !== false);
    }

    /**
     * 定义点击对话框确定按钮事件
     */
    const onDialogConfirm = (event: any) => {
      event && event.stopPropagation();
      emit("dialogConfirm", {});
    };

    /**
     * 定义点击对话框取消按钮事件
     */
    const onDialogCancel = (event: any) => {
      event && event.stopPropagation();
      emit("dialogCancel", {});
    };

    /**
     * 定义关闭事件
     * @param retValues
     */
    const onCloseDialog = (retValues: any) => {
      props.model.visible = false;
      props.model.header = "";
      props.model.data = {};
      props.model.onClose && props.model.onClose(retValues);
    };

    expose({
      closeDialog: onCloseDialog
    });

    /**
     * 定义返回模板
     */
    return () => {
      onInitDialog();
      return <ElDialog
          {...props}
          {...attrs}
          modelValue={componentVisible.value}
          onUpdate:modelValue={(val: boolean) => componentVisible.value = val}
          header-class={`is-${props.model.headerAlign}-alignment`}
          title={props.model.header}
          width={props.model.width}
          fullscreen={props.model.fullscreen}
          appendToBody={props.model.appendToBody}
          closeOnClickModal={false}
          closeOnPressEscape={false}
          alignCenter
          draggable
          show-close={false}
          v-slots={{
            default: () => {
              return props.model.url != null && props.model.url != ''
                  ? <iframe src={props.model.url} style={`width: 100%; height: ${props.model.height}; border: 0;`}></iframe>
                  : (
                      <div class="mag-dialog__body" style={`height: ${props.model.height};`}>
                        {slots?.default?.()}
                      </div>
                  )
            },
            footer: () => {
              return (props.model.showConfirmBtn || props.model.showCancelBtn)
                  && (
                      <div class={{
                        "mag-dialog__footer": true,
                        "is-left-alignment": props.model.footerAlign === "left",
                        "is-right-alignment": props.model.footerAlign === "right",
                        "is-center-alignment": props.model.footerAlign === "center"
                      }}>
                        {props.model.showCancelBtn && (<MagButton onClick={onDialogCancel}>取消</MagButton>)}
                        {props.model.showConfirmBtn && (<MagButton onClick={onDialogConfirm} type="primary">确定</MagButton>)}
                      </div>
                  )
            }
          }}>
      </ElDialog>
    }
  }
});

export default MagDialog;
