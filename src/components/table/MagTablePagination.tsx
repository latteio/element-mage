import {defineComponent, PropType, reactive} from "vue";
import {ElPagination} from "element-plus";
import {Search} from "@element-plus/icons-vue";
import {MagTablePaginationBarType} from "@/element-mage-types";
import MagInput from "@/components/form/MagInput";

const MagTablePagination = defineComponent({
  name: "MagTablePagination",
  props: {
    pageBars: {type: Array as PropType<string[]>, required: false, default: () => ["search"]}
  },
  emits: ["search"],
  setup(props, {attrs, emit}) {
    const pageBarsModel = reactive({
      keywords: ''
    });

    /**
     * 定义分页栏搜索事件
     */
    const onPaginationSearch = (event: KeyboardEvent) => {
      if (event) {
        event.stopPropagation();
        event.key === 'Enter' && onPaginationSearchSubmit();
      } else {
        onPaginationSearchSubmit();
      }
    }

    /**
     * 定义分页栏搜索提交事件
     */
    const onPaginationSearchSubmit = () => {
      emit("search", pageBarsModel.keywords)
    }

    /**
     *  创建分页栏上的额外组件
     */
    const createExtraPageBars = () => {
      return props.pageBars
          && props.pageBars.includes(MagTablePaginationBarType.Search)
          && <MagInput formType={false}
                       model={pageBarsModel}
                       prop="keywords"
                       prefix-icon={Search}
                       clearable
                       placeholder="请输入关键词搜索"
                       onClear={onPaginationSearch}
                       onKeydown={onPaginationSearch}
          />
    }

    /**
     * 定义返回模板
     */
    return () => {
      return <>
        <ElPagination {...props}
                      {...attrs}
                      v-slots={{
                        default: createExtraPageBars
                      }}>
        </ElPagination>
      </>
    }
  }
});

export default MagTablePagination;
