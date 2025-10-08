import {defineComponent, h, inject, nextTick, onMounted, PropType, reactive, ref} from "vue";
import {ElCollapseTransition, ElContainer, ElHeader, ElIcon, ElMain, ElTree} from "element-plus";
import {ArrowRight} from "@element-plus/icons-vue";
import MagTreeBar from "@/components/tree/MagTreeBar";
import {baseProps} from "@/components/defineViewComponent";
import Objects from "@/utils/Objects";

const MagTree = defineComponent({
  name: "MagTree",
  props: {
    ...baseProps,
    region: {type: String, required: false, default: () => "center"},
    header: {type: String, required: false, default: () => ""},
    data: {type: Array as PropType<any[]>, required: false, default: () => []},
    dataUrl: {type: String, required: false, default: () => ""},
    method: {type: String, required: false, default: () => "POST"},
    params: {type: Object, required: false, default: () => null},
    autoLoad: {type: Boolean, required: false, default: () => true}
  },
  setup(props, {attrs, slots, expose}) {
    const apiRequest: any = inject("mag_app__api_request");
    const componentVisible = ref(props.visible);
    const componentExpanded = ref(props.expanded);
    const loadingStatus = ref(false);

    /**
     * 定义树内置模型变量
     */
    const treeModel = reactive({
      data: props.data,
      dataUrl: props.dataUrl || "",
      method: props.method || "POST",
      params: {...props.params}
    });

    /**
     * 内部方法: 加载数据
     * @param data
     */
    const loadDataInternal = (data: Array<any>) => {
      if (data) {
        treeModel.data = data;
      }
    }

    /**
     * 内部方法: 异步加载数据
     * @param params 查询参数
     * @param beforeLoader 数据加载前的处理(需要返回处理后的数据)
     */
    const loadDataAsyncInternal = (params: any, ...beforeLoader: Array<Function | undefined>) => {
      if (treeModel.dataUrl !== '') {
        loadingStatus.value = true;
        apiRequest({
          url: treeModel.dataUrl,
          method: treeModel.method,
          data: {...treeModel.params, ...params}
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
     * 设置组件展开 / 收缩
     */
    const setExpandedInternal = () => {
      setExpanded(!componentExpanded.value);
    }
    const setExpanded = (paramExpanded: boolean) => {
      componentExpanded.value = paramExpanded;
    }

    /**
     * 定义组件外部方法
     */
    expose({
      datasourceProperties() {
        return {
          dataUrl: treeModel.dataUrl,
          method: treeModel.method,
          params: treeModel.params
        }
      },
      setVisible: (visible: boolean) => {
        componentVisible.value = visible;
      },
      setExpanded,
      load: loadDataAsyncInternal,
      loadData: loadDataInternal
    });

    /**
     * 定义页面准备好后执行事件
     */
    onMounted(() => {
      nextTick(() => {
        if (props.autoLoad && Objects.isEmpty(treeModel.data)) {
          loadDataAsyncInternal({});
        }
      }).then(() => {
      });
    });

    /**
     * 定义返回模板
     */
    return () => {
      let childNodes: any = slots?.default?.();
      let treeBar: any = null;

      childNodes && childNodes.map((node: any) => {
        if (node?.type?.name && node?.type?.name === MagTreeBar.name) {
          treeBar = node;
        }
      });

      const treeHeader = () => {
        if (props.header) {
          return <ElHeader onclick={setExpandedInternal}
                           class={{
                             "mag-view__header": true,
                             "is-expanded": componentExpanded.value,
                             "is-collapsed": !componentExpanded.value,
                           }}>
            <div class="mag-view__header-text">{props.header}</div>
            <div class="mag-view__header-icon">
              {
                componentExpanded.value
                    ? (<ElIcon class="is-expanded"><ArrowRight/></ElIcon>)
                    : (<ElIcon><ArrowRight/></ElIcon>)
              }
            </div>
          </ElHeader>
        } else {
          return <ElHeader class="mag-view__header-empty">
          </ElHeader>
        }
      }

      const treeBody = () => {
        if (null != treeBar) {
          return <ElTree check-strictly={true} {...props} {...attrs}
                         data={treeModel.data}
                         v-slots={{
                           default: (data: any) =>
                               h(MagTreeBar, {treeProps: {...attrs?.props as any}, dataScope: {...data}},
                                   {default: () => treeBar?.children?.default()})
                         }}>
          </ElTree>
        } else {
          return <ElTree check-strictly={true} {...props} {...attrs} data={treeModel.data}>
          </ElTree>
        }
      }

      return <ElContainer v-show={componentVisible.value}
                          class={{
                            "mag-view-card-layout is-shadow-layout": props.shadow,
                            "is-expanded": componentExpanded.value,
                            "is-collapsed": !componentExpanded.value
                          }}
                          v-loading={loadingStatus.value}>
        {treeHeader()}
        <ElCollapseTransition>
          <ElMain class="mag-tree__main" v-show={componentExpanded.value}>
            {treeBody()}
          </ElMain>
        </ElCollapseTransition>
      </ElContainer>
    }
  }
});

export default MagTree;
