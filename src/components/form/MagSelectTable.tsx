import {defineComponent, inject, onMounted, PropType, provide, reactive, ref} from 'vue'
import {ElCheckbox, ElInput, ElPagination, ElScrollbar, ElSelect, ElTable, ElTableColumn} from 'element-plus'
import {baseProps} from "@/components/defineFormComponent";
import {MagTableData} from "@/element-mage-types";
import MagFlexComponent from "@/components/basic/MagFlexComponent";
import Objects from "@/utils/Objects";

export interface TableDataType {
  [key: string]: any
}

const MagSelectTable = defineComponent({
  name: 'MagSelectTable',
  props: {
    ...baseProps,
    type: {type: String, required: false, default: () => "select-table"},
    dropdownHeight: {type: String, required: false, default: "300px"},
    multiple: {type: Boolean, required: false, default: true},
    placeholder: {type: String, required: false, default: "请选择"},
    clearable: {type: Boolean, required: false, default: true},
    filterable: {type: Boolean, required: false, default: true},
    rowKey: {type: String, required: false, default: "id"},
    valueKey: {type: String, required: false, default: "value"},
    labelKey: {type: String, required: false, default: "label"},
    total: {type: Number, required: false, default: () => 0},
    data: {type: Array as PropType<TableDataType[]>, required: false, default: () => []},
    dataUrl: {type: String, required: false, default: () => ""},
    method: {type: String, required: false, default: () => "POST"},
    params: {type: Object, required: false, default: () => null},
    autoLoad: {type: Boolean, required: false, default: () => true},
    pageLayout: {type: String, required: false, default: () => "total, sizes, prev, pager, next, jumper"},
    pageSizes: {type: Array as PropType<number[]>, required: false, default: () => [10, 20, 30, 50, 100, 200, 300, 500]},
    pageNum: {type: Number, required: false, default: () => 1},
    pageSize: {type: Number, required: false, default: () => 20}
  },
  emits: ['filter', 'visible-change'],
  setup(props, {attrs, slots, emit}) {
    const apiRequest: any = inject("mag_app__api_request");
    const loadingStatus = ref(false);

    /**
     * 表格变量集: 用于跨组件传递
     */
    const editableTableVariables = reactive({editableTable: false});
    provide("mag_table__editable_variables", editableTableVariables);

    const filterInputRef = ref<InstanceType<typeof ElInput> | null>(null)
    const tableSelectModel = reactive({
      visible: false,
      filterText: '',
      selectedRows: [] as TableDataType[],
      isSelectAll: false,

      /* 表格数据 */
      cachedRowData: props.data as TableDataType[],
      rowData: props.data as TableDataType[],
      rowTotal: ((props.data && props.data.length) || props.total || 0) as number,
      pageNum: props.pageNum,
      pageSize: props.pageSize,
      /* 表格数据的获取参数 */
      pageUrl: props.dataUrl || "",
      pageMethod: props.method || "POST",
      pageBaseParams: {pageNum: props.pageNum, pageSize: props.pageSize, ...props.params},
      cachedQueryParams: {},
      cachedBeforeLoader: [] as Array<Function | undefined>
    });

    /* 初始化表格数据 */
    onMounted(() => {
    })

    /* 更新选中的项 */
    const updateSelectedRows = () => {
      if (!props.model[props.prop] || (Array.isArray(props.model[props.prop]) && props.model[props.prop].length === 0)) {
        tableSelectModel.selectedRows = []
        return
      }

      if (props.multiple) {
        tableSelectModel.selectedRows = tableSelectModel.rowData.filter(item =>
            (props.model[props.prop] as any[]).includes(item[props.valueKey]))
      } else {
        const selectedItem = tableSelectModel.rowData.find(item => item[props.valueKey] === props.model[props.prop])
        tableSelectModel.selectedRows = selectedItem ? [selectedItem] : []
      }

      updateSelectAllState()
    }

    /* 更新全选状态 */
    const updateSelectAllState = () => {
      if (!props.multiple) return

      const selectedCount = tableSelectModel.selectedRows.length
      tableSelectModel.isSelectAll = selectedCount === tableSelectModel.rowData.length && selectedCount > 0
    }

    /**
     * 定义切换下拉框显示状态事件
     * @param visible
     */
    const handleVisibleChange = (visible: boolean) => {
      tableSelectModel.visible = visible
      tableSelectModel.filterText = ''
      tableSelectModel.rowData = []
      if (visible) {
        /* 延迟聚焦搜索框 */
        setTimeout(() => {
          filterInputRef.value?.focus()
        }, 100)
        loadDataAsyncInternal({}).then(() => {
          updateSelectedRows();
        }).catch((e: any) => {
          console.log('handleVisibleChange(): An exception occurred while requesting data: ', e)
        });
      }

      emit('visible-change', visible)
    }

    /**
     * 定义选择行事件
     * @param row
     */
    const handleSelect = (row: TableDataType) => {
      if (props.multiple) {
        const values: any[] = props.model[props.prop]
            ? (Objects.isArray(props.model[props.prop]) ? props.model[props.prop] : [props.model[props.prop]])
            : []

        const index = values.findIndex(item => item === row[props.valueKey])
        if (index > -1) {
          values.splice(index, 1)
          tableSelectModel.selectedRows.splice(index, 1)
        } else {
          values.push(row[props.valueKey])
          tableSelectModel.selectedRows.push(row)
        }
        props.model[props.prop] = [...values]
      } else {
        tableSelectModel.selectedRows = [row]
        props.model[props.prop] = row[props.valueKey]
        tableSelectModel.visible = false
      }
    }

    /**
     * 定义过滤表格数据事件
     */
    const handleFilter = () => {
      if (!tableSelectModel.filterText) {
        tableSelectModel.rowData = [...tableSelectModel.cachedRowData]
        emit('filter', '')
        return
      }

      tableSelectModel.rowData = tableSelectModel.cachedRowData.filter(item => {
        return Object.values(item).some(val =>
            String(val).toLowerCase().includes(tableSelectModel.filterText.toLowerCase())
        )
      })

      emit('filter', tableSelectModel.filterText)
    }

    /**
     * 判断是否选中
     * @param value
     */
    const isSelected = (value: any) => {
      if (props.multiple) {
        return props.model[props.prop] && (props.model[props.prop] as any[]).includes(value)
      }

      return props.model[props.prop] === value
    }

    /**
     * 定义清空选择事件
     */
    const handleClear = () => {
      tableSelectModel.selectedRows = []
      tableSelectModel.isSelectAll = false
    }

    /**
     * 内部方法: 定义切换当前页处理事件
     * @param val
     */
    const handleCurrentChange = (val: number) => {
      tableSelectModel.pageNum = val;
      tableSelectModel.pageBaseParams["pageNum"] = val;
      loadDataAsyncInternal(tableSelectModel.cachedQueryParams,
          tableSelectModel.cachedBeforeLoader && tableSelectModel.cachedBeforeLoader[0]
              ? tableSelectModel.cachedBeforeLoader[0]
              : undefined);
    }

    /**
     * 内部方法: 定义切换每页显示条数处理事件
     * @param val
     */
    const handleSizeChange = (val: number) => {
      tableSelectModel.pageSize = val;
      tableSelectModel.pageBaseParams["pageSize"] = val;
      loadDataAsyncInternal(tableSelectModel.cachedQueryParams,
          tableSelectModel.cachedBeforeLoader && tableSelectModel.cachedBeforeLoader[0]
              ? tableSelectModel.cachedBeforeLoader[0]
              : undefined);
    }

    /**
     * 内部方法: 加载数据
     * @param data
     */
    const loadDataInternal = (data: MagTableData | any) => {
      if (data) {
        if (data.pageNum && data.pageSize) {
          tableSelectModel.pageNum = data?.pageNum;
          tableSelectModel.pageSize = data?.pageSize;
          tableSelectModel.cachedRowData = data?.records;
          tableSelectModel.rowData = data?.records;
          tableSelectModel.rowTotal = data?.total;
        } else {
          tableSelectModel.cachedRowData = data;
          tableSelectModel.rowData = data;
          tableSelectModel.rowTotal = data?.length;
        }
      }
    }

    /**
     * 内部方法: 异步加载数据
     * @param params 查询参数
     * @param beforeLoader 数据加载前的处理(需要返回处理后的数据)
     */
    const loadDataAsyncInternal = (params: any, ...beforeLoader: Array<Function | undefined>) => {
      if (tableSelectModel.pageUrl !== '') {
        loadingStatus.value = true;
        tableSelectModel.cachedQueryParams = Object.assign({}, params);
        tableSelectModel.cachedBeforeLoader = beforeLoader || [] as Array<Function | undefined>;
        return apiRequest({
          url: tableSelectModel.pageUrl,
          method: tableSelectModel.pageMethod,
          data: {...tableSelectModel.pageBaseParams, ...tableSelectModel.cachedQueryParams}
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

    const createSelectComponent = () => {
      // TODO: 增加data获取以便做回显
      return <ElSelect
          {...props}
          {...attrs}
          v-model={props.model[props.prop]}
          multiple={props.multiple}
          filterable={props.filterable}
          placeholder={props.placeholder}
          clearable={props.clearable}
          onVisibleChange={handleVisibleChange}
          onClear={handleClear}
          /* 禁用原生下拉菜单 */
          popper-append-to-body={false}
          popper-class="mag-select-table-popper"
          v-slots={{
            /* 自定义下拉内容 */
            header: () => (
                <div class="mag-select-table-dropdown">
                  {/* 下拉表格搜索框 */}
                  {props.filterable && (
                      <div class="mag-select-table-filter">
                        <ElInput
                            ref={filterInputRef}
                            v-model={tableSelectModel.filterText}
                            size="default"
                            placeholder="请输入关键词过滤"
                            onInput={handleFilter}
                            clearable
                        />
                      </div>
                  )}

                  {/* 下拉表格 */}
                  <ElScrollbar>
                    <ElTable
                        style={{width: '100%', height: props.dropdownHeight}}
                        size="small"
                        data={tableSelectModel.rowData}
                        row-key={props.rowKey}
                        onSelect={(row: TableDataType | null) => row && handleSelect(row)}
                    >
                      {/* 选择列 */}
                      <ElTableColumn width={50} prop="rowSelectBox" label=" " fixed="left">
                        {{
                          default: ({row}: {
                            row: TableDataType
                          }) => <ElCheckbox
                              modelValue={isSelected(row[props.valueKey])}
                              onChange={() => handleSelect(row)}
                          />
                        }}
                      </ElTableColumn>
                      {/* 表格列 */}
                      {slots?.default?.()}
                    </ElTable>
                    {/* 分页栏 */}
                    <ElPagination
                        class="mag-select-table-dropdown__footer"
                        layout={props.pageLayout}
                        size="small"
                        page-sizes={props.pageSizes}
                        total={tableSelectModel.rowTotal}
                        v-model:current-page={tableSelectModel.pageNum}
                        v-model:page-size={tableSelectModel.pageSize}
                        onCurrentChange={handleCurrentChange}
                        onSizeChange={handleSizeChange}
                        background>
                    </ElPagination>
                  </ElScrollbar>
                </div>
            )
          }}
      />
    }

    /**
     * 定义返回模板
     */
    return () => {
      return props.formType
          ? createSelectComponent()
          : <MagFlexComponent {...props} {...attrs}>
            {createSelectComponent()}
          </MagFlexComponent>
    }
  }
})

export default MagSelectTable;