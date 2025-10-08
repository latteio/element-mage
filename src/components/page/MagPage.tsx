import {defineComponent, onMounted, PropType} from "vue";
import {Router} from "vue-router";
import {ElPageHeader} from "element-plus";
import {ArrowLeft} from "@element-plus/icons-vue";
import Strings from "@/utils/Strings";

const MagPage = defineComponent({
  name: "MagPage",
  props: {
    header: {type: String, required: false, default: () => ""},
    router: {type: Object as PropType<Router>, required: true, default: () => null},
    backwardPath: {type: String, required: true, default: () => "/"},
    shadow: {type: Boolean as PropType<boolean>, required: false, default: () => true}
  },
  emits: ["pageReady"],
  setup(props, {attrs, slots, emit, expose}) {

    /**
     * 定义组件外部方法
     */
    expose({getUrlParams: Strings.getUrlParams});

    /**
     * 定义组件加载完成事件
     */
    onMounted(() => {
      emit("pageReady", Strings.getUrlParams());
    });

    /**
     * 定义页面后退事件
     */
    const backwardHandler = () => {
      props.backwardPath && props.router.push(props.backwardPath);
    }

    /**
     * 定义返回模板
     */
    return () => {
      return <ElPageHeader {...props}
                           {...attrs}
                           class={{
                             "mag-page": true,
                             "mag-view-card-layout is-shadow-layout": props.shadow
                           }}
                           icon={ArrowLeft}
                           onBack={backwardHandler}
                           v-slots={{
                             content: () => {
                               return <span>{props.header}</span>
                             },
                             default: () => {
                               return slots?.default?.();
                             }
                           }}>
      </ElPageHeader>
    }
  }
});

export default MagPage;
