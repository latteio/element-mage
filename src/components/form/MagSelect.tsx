import {defineComponent, inject, nextTick, onMounted, PropType, reactive, ref} from "vue";
import {ElOption, ElSelect} from "element-plus";
import {MagSelectOptionType} from "@/element-mage-types";
import {baseProps} from "@/components/defineFormComponent";
import MagFlexComponent from "@/components/basic/MagFlexComponent";
import Objects from "@/utils/Objects";

const MagSelect = defineComponent({
  name: "MagSelect",
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "select"},
    data: {type: Array as PropType<MagSelectOptionType[]>, required: false, default: () => []},
    dataUrl: {type: String, required: false, default: () => ""},
    method: {type: String, required: false, default: () => "POST"},
    params: {type: Object, required: false, default: () => null},
    autoLoad: {type: Boolean, required: false, default: () => true}
  },
  setup(props, {attrs, expose}) {
    const apiRequest: any = inject("mag_app__api_request");
    const loadingStatus = ref(false);

    /**
     * 定义下拉列表内置模型变量
     */
    const selectModel = reactive({
      /* 初始化数据 */
      selectOptionsData: props.data,
      /* 获取数据的参数 */
      selectUrl: props.dataUrl || "",
      selectMethod: props.method || "POST",
      selectParams: {...props.params}
    });

    /**
     * 内部方法: 加载数据
     * @param data
     */
    const loadDataInternal = (data: Array<MagSelectOptionType>) => {
      selectModel.selectOptionsData = data;
    }

    /**
     * 内部方法: 异步加载数据
     * @param params 查询参数
     * @param beforeLoader 数据加载前的处理(需要返回处理后的数据)
     */
    const loadDataAsyncInternal = (params: any, ...beforeLoader: Array<Function | undefined>) => {
      if (selectModel.selectUrl !== '') {
        loadingStatus.value = true;
        apiRequest({
          url: selectModel.selectUrl,
          method: selectModel.selectMethod,
          data: {...selectModel.selectParams, ...params}
        }).then(({data}: any) => {
          let handledData = (beforeLoader && beforeLoader[0]) ? beforeLoader[0](data) : data;
          loadDataInternal(handledData);
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
        if (props.autoLoad && Objects.isEmpty(selectModel.selectOptionsData)) {
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
        return <ElSelect {...props}
                         {...attrs}
                         filterable
                         v-model={props.model[props.prop]}
                         loading={loadingStatus.value}>
          {
            selectModel.selectOptionsData.map((opt: MagSelectOptionType) => <ElOption {...opt} ></ElOption>)
          }
        </ElSelect>
      }

      return <MagFlexComponent {...props} {...attrs}>
        <ElSelect {...props}
                  {...attrs}
                  filterable
                  v-model={props.model[props.prop]}
                  loading={loadingStatus.value}>
          {
            selectModel.selectOptionsData.map((opt: MagSelectOptionType) => <ElOption {...opt} ></ElOption>)
          }
        </ElSelect>
      </MagFlexComponent>
    }
  }
});

export default MagSelect;
