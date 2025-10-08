import {defineComponent, inject, nextTick, onMounted, PropType, reactive, ref} from "vue";
import {ElTreeSelect} from "element-plus";
import {MagSelectTreeOptionType} from "@/element-mage-types";
import {baseProps} from "@/components/defineFormComponent";
import MagFlexComponent from "@/components/basic/MagFlexComponent";
import Objects from "@/utils/Objects";

const MagSelectTree = defineComponent({
  name: "MagSelectTree",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "select-tree"},
    data: {type: Array as PropType<MagSelectTreeOptionType[]>, required: false, default: () => []},
    dataUrl: {type: String, required: false, default: () => ""},
    method: {type: String, required: false, default: () => "POST"},
    params: {type: Object, required: false, default: () => null},
    autoLoad: {type: Boolean, required: false, default: () => true}
  },
  setup(props, {attrs, expose}) {
    const apiRequest: any = inject("mag_app__api_request");
    const loadingStatus = ref(false);

    /**
     * 定义下拉树内置模型变量
     */
    const treeSelectModel = reactive({
      /* 初始化数据 */
      treeSelectOptionsData: props.data,
      /* 获取数据的参数 */
      selectUrl: props.dataUrl || "",
      selectMethod: props.method || "POST",
      selectParams: {...props.params}
    });

    /**
     * 内部方法: 加载数据
     * @param data
     */
    const loadDataInternal = (data: Array<MagSelectTreeOptionType>) => {
      treeSelectModel.treeSelectOptionsData = data;
    }

    /**
     * 内部方法: 异步加载数据
     * @param params 查询参数
     * @param beforeLoader 数据加载前的处理(需要返回处理后的数据)
     */
    const loadDataAsyncInternal = (params: any, ...beforeLoader: Array<Function | undefined>) => {
      if (treeSelectModel.selectUrl !== '') {
        loadingStatus.value = true;
        apiRequest({
          url: treeSelectModel.selectUrl,
          method: treeSelectModel.selectMethod,
          data: {...treeSelectModel.selectParams, ...params}
        }).then(({data}: any) => {
          let handledData: any = (beforeLoader && beforeLoader[0]) ? beforeLoader[0](data) : data;
          loadDataInternal(Objects.isArray(handledData) ? handledData : [handledData]);
        }).catch((e: any) => {
          console.log('loadDataAsyncInternal(): An exception occurred while requesting data: ', e)
        }).finally(() => {
          loadingStatus.value = false;
        });
      }
    }

    /**
     * 定义组件外部方法
     */
    expose({
      load: loadDataAsyncInternal,
      loadData: loadDataInternal
    });

    /**
     * 定义页面准备好后执行事件
     */
    onMounted(() => {
      nextTick(() => {
        if (props.autoLoad && Objects.isEmpty(treeSelectModel.treeSelectOptionsData)) {
          loadDataAsyncInternal({});
        }
      }).then(() => {
      });
    });

    /**
     * 定义返回模板
     */
    return () => {
      if (props.formType) {
        return <ElTreeSelect check-strictly={true} {...props} {...attrs}
                             v-model={props.model[props.prop]}
                             data={treeSelectModel.treeSelectOptionsData} filterable loading={loadingStatus.value}/>
      }

      return <MagFlexComponent {...props} {...attrs}>
        <ElTreeSelect check-strictly={true} {...props} {...attrs}
                      v-model={props.model[props.prop]}
                      data={treeSelectModel.treeSelectOptionsData} filterable loading={loadingStatus.value}/>
      </MagFlexComponent>
    }
  }
});

export default MagSelectTree;
