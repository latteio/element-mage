import {defineComponent, inject, nextTick, onMounted, PropType, provide, reactive, ref} from "vue";
import {uuid} from "vue3-uuid";
import {ElCollapseTransition, ElContainer, ElHeader, ElIcon, ElMain, ElTable, ElTableColumn} from "element-plus";
import {ArrowRight} from "@element-plus/icons-vue";
import {MagTableData} from "@/element-mage-types";
import MagTableBar from "@/components/table/MagTableBar";
import MagTableColumn from "@/components/table/MagTableColumn";
import MagTablePagination from "@/components/table/MagTablePagination";
import {baseProps} from "@/components/defineViewComponent";
import Objects from "@/utils/Objects";

const MagTable = defineComponent({
  name: "MagTable",
  props: {
    /* 表格默认属性 */
    ...baseProps,
    /* 表格基础属性 */
    region: {type: String, required: false, default: () => "center"},
    header: {type: String, required: false, default: () => ""},
    rowCheckbox: {type: Boolean, required: false, default: () => false},
    rowIndex: {type: Boolean, required: false, default: () => false},
    rowKey: {type: String, required: false, default: () => "id"},
    rowCheckedKeys: {type: Array as PropType<any[]>, required: false, default: () => []},
    total: {type: Number, required: false, default: () => 0},
    data: {type: Array as PropType<any[]>, required: false, default: () => []},
    dataUrl: {type: String, required: false, default: () => ""},
    method: {type: String, required: false, default: () => "POST"},
    params: {type: Object, required: false, default: () => null},
    autoLoad: {type: Boolean, required: false, default: () => true},
    /* 分页相关属性 */
    usePage: {type: Boolean, required: false, default: () => true},
    pageAlign: {type: String, required: false, default: () => "left"},
    pageLayout: {type: String, required: false, default: () => "total, sizes, prev, pager, next, jumper, slot"},
    pageBars: {type: Array as PropType<string[]>, required: false, default: () => ["search"]},
    pageSizes: {type: Array as PropType<number[]>, required: false, default: () => [10, 20, 30, 50, 100, 200, 300, 500]},
    pageNum: {type: Number, required: false, default: () => 1},
    pageSize: {type: Number, required: false, default: () => 20},
    /* 事件 */
    selectableHandler: {type: Function as PropType<(row: any, index: number) => boolean>, required: false, default: () => true}
  },
  setup(props, {attrs, slots, expose}) {
    const apiRequest: any = inject("mag_app__api_request");
    const componentVisible = ref(props.visible);
    const componentExpanded = ref(props.expanded);
    const loadingStatus = ref(false);

    /**
     * 可编辑表格变量集: 用于跨组件传递
     */
    const editableTableVariables = reactive({
      editableTable: false,
      editableTableColumns: {} as any,
      editableTableEvents: {},
      editableTableRowKey: props.rowKey,
      editableTableModifiedRowData: {} as any,
      editableTableRowBtnStatus: {MagEditButton: '', MagDeleteButton: ''},
      editableTableRowBtnRefs: {} as any
    });
    provide("mag_table__editable_variables", editableTableVariables);

    /**
     * 定义表格内置模型变量
     */
    const tableModel = reactive({
      rowData: props.data,
      rowTotal: (props.data && props.data.length) || props.total || 0,
      pageNum: props.pageNum,
      pageSize: props.pageSize,
      pageChanged: false,
      /* 获取数据的参数 */
      pageUrl: props.dataUrl || "",
      pageMethod: props.method || "POST",
      pageBaseParams: {pageNum: props.pageNum, pageSize: props.pageSize, keywords: '', ...props.params},
      cachedQueryParams: {},
      cachedBeforeLoader: [] as Array<Function | undefined>
    });

    /**
     * 内部方法: 定义切换当前页处理事件
     * @param val
     */
    const handleCurrentChange = (val: number) => {
      tableModel.pageChanged = true;
      tableModel.pageNum = val;
      tableModel.pageBaseParams["pageNum"] = val;
      handleLoadDataAsync(tableModel.cachedQueryParams,
          tableModel.cachedBeforeLoader && tableModel.cachedBeforeLoader[0]
              ? tableModel.cachedBeforeLoader[0]
              : undefined);
    }

    /**
     * 内部方法: 定义切换每页显示条数处理事件
     * @param val
     */
    const handleSizeChange = (val: number) => {
      tableModel.pageSize = val;
      tableModel.pageBaseParams["pageSize"] = val;
      handleLoadDataAsync(tableModel.cachedQueryParams,
          tableModel.cachedBeforeLoader && tableModel.cachedBeforeLoader[0]
              ? tableModel.cachedBeforeLoader[0]
              : undefined);
    }

    /**
     * 定义分页栏搜索事件
     */
    const handlePaginationSearch = (keywords: string) => {
      tableModel.pageBaseParams.keywords = keywords;
      handleLoadDataAsync(tableModel.cachedQueryParams,
          tableModel.cachedBeforeLoader && tableModel.cachedBeforeLoader[0]
              ? tableModel.cachedBeforeLoader[0]
              : undefined);
    }

    /**
     * 内部方法: 加载数据
     * @param data
     */
    const handleLoadData = (data: MagTableData | any) => {
      const lastPageRowData = tableModel.rowData;
      if (data) {
        if (data.pageNum && data.pageSize) {
          tableModel.pageNum = data?.pageNum;
          tableModel.pageSize = data?.pageSize;
          tableModel.rowData = data?.records;
          tableModel.rowTotal = data?.total;
        } else {
          tableModel.pageNum = 0;
          tableModel.pageSize = 0;
          tableModel.rowData = data;
          tableModel.rowTotal = data?.length;
        }
      }

      if (editableTableVariables.editableTable) {
        if (tableModel.pageChanged) {
          const keys = lastPageRowData.map((row: any) => row[editableTableVariables.editableTableRowKey]);
          handleRemoveRowBtnRefsInternal(keys, tableModel.pageChanged);
          tableModel.pageChanged = false;
        }
        handleCancelEditRowData(null, true);
      }
    }

    /**
     * 内部方法: 异步加载数据
     * @param params 查询参数
     * @param beforeLoader 数据加载前的处理(需要返回处理后的数据)
     */
    const handleLoadDataAsync = (params: any, ...beforeLoader: Array<Function | undefined>) => {
      if (tableModel.pageUrl !== '') {
        loadingStatus.value = true;
        tableModel.cachedQueryParams = Object.assign({}, params);
        tableModel.cachedBeforeLoader = beforeLoader || [] as Array<Function | undefined>;
        apiRequest({
          url: tableModel.pageUrl,
          method: tableModel.pageMethod,
          data: {...tableModel.pageBaseParams, ...tableModel.cachedQueryParams}
        }).then(({data}: any) => {
          let handledData = (beforeLoader && beforeLoader[0]) ? beforeLoader[0](data) : data;
          handleLoadData(handledData);
        }).catch((e: any) => {
          console.log('handleLoadDataAsync(): An exception occurred while requesting data: ', e)
        }).finally(() => {
          loadingStatus.value = false;
        });
      }
    }

    /**
     * 内部方法: 定义动态插入数据行事件处理方法(默认插入到首行)
     * @param rowData
     */
    const handleAddRowData = (rowData: any) => {
      /* 新增行时: 默认编辑按钮处于打开编辑状态 */
      editableTableVariables.editableTableRowBtnStatus["MagEditButton"] = "editing";

      const key: string = uuid.v4();
      rowData[editableTableVariables.editableTableRowKey] = key;
      tableModel.rowData.splice(0, 0, rowData);
      editableTableVariables.editableTableModifiedRowData [key] = {
        type: "insert",
        data: rowData,
        modified: false
      }

      nextTick(() => {
        editableTableVariables.editableTableRowBtnStatus["MagEditButton"] = "";
      }).then(() => {
      })
    }

    const handleEditRowDataInternal = (rowData: any) => {
      const key = rowData[editableTableVariables.editableTableRowKey];
      if (key && !editableTableVariables.editableTableModifiedRowData [key]) {
        if (editableTableVariables.editableTableRowBtnRefs[key] && editableTableVariables.editableTableRowBtnRefs[key]["MagEditButton"]) {
          editableTableVariables.editableTableRowBtnRefs[key]["MagEditButton"].setButtonStatus("editing")
        }

        editableTableVariables.editableTableModifiedRowData [key] = {
          type: "update",
          data: rowData,
          modified: false
        }
      }
    }

    /**
     * 内部方法: 定义动态编辑数据行事件处理方法
     * @param rowData 编辑行对象
     * @param isCurrentPage 是否编辑当前页
     */
    const handleEditRowData = (rowData: any, isCurrentPage: boolean) => {
      if (isCurrentPage) {
        for (let i = 0; i < tableModel.rowData.length; i++) {
          handleEditRowDataInternal(tableModel.rowData[i]);
        }
        return;
      }

      if (rowData) {
        handleEditRowDataInternal(rowData);
      }
    }

    /**
     * 内部方法: 定义动态删除数据行事件处理方法
     * @param rowData
     */
    const handleDelRowData = (rowData: any) => {
      const key: string = rowData[editableTableVariables.editableTableRowKey];
      if (key) {
        if (editableTableVariables.editableTableModifiedRowData [key]) {
          delete editableTableVariables.editableTableModifiedRowData [key];
        }

        let tmpKey, tmpIndex = -1;
        for (let i = 0; i < tableModel.rowData.length; i++) {
          tmpKey = tableModel.rowData[i][editableTableVariables.editableTableRowKey];
          if (tmpKey == key) {
            editableTableVariables.editableTableModifiedRowData [key] = {
              type: "delete",
              data: tableModel.rowData[i],
              modified: true
            }
            tmpIndex = i;
            break;
          }
        }

        if (tmpIndex > -1) {
          tableModel.rowData.splice(tmpIndex, 1)
        }
      }
    }

    const handleRemoveRowBtnRefsInternal = (keys: Array<string>, removable: boolean) => {
      if (removable) {
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] && editableTableVariables.editableTableRowBtnRefs[keys[i]]) {
            delete editableTableVariables.editableTableRowBtnRefs[keys[i]];
          }
        }
      }
    }

    const handleCancelEditRowDataInternal = (key: string) => {
      if (key && editableTableVariables.editableTableModifiedRowData[key]) {
        if (editableTableVariables.editableTableModifiedRowData[key]["type"] == "delete") {
          handleRemoveRowBtnRefsInternal([key], true)
        } else if (editableTableVariables.editableTableRowBtnRefs[key] && editableTableVariables.editableTableRowBtnRefs[key]["MagEditButton"]) {
          editableTableVariables.editableTableRowBtnRefs[key]["MagEditButton"].setButtonStatus("edit")
        }
        delete editableTableVariables.editableTableModifiedRowData[key]
      }
    }

    /**
     * 内部方法: 定义动态取消编辑数据行事件处理方法
     * @param rowData 编辑行对象
     * @param isCurrentPage 是否取消编辑当前页
     */
    const handleCancelEditRowData = (rowData: any, isCurrentPage: boolean) => {
      if (isCurrentPage) {
        for (let key in editableTableVariables.editableTableModifiedRowData) {
          handleCancelEditRowDataInternal(key)
        }
        return;
      }

      if (rowData) {
        const key = rowData[editableTableVariables.editableTableRowKey];
        handleCancelEditRowDataInternal(key)
      }
    }

    /**
     * 返回可编辑表格模式下的已编辑行
     */
    const getModifiedRowData = () => {
      let modifiedRows = {
        insertEntities: [] as Array<any>,
        updateEntities: [] as Array<any>,
        deleteEntities: [] as Array<any>
      };

      let row;
      for (let key in editableTableVariables.editableTableModifiedRowData) {
        row = editableTableVariables.editableTableModifiedRowData[key];
        let {type, modified} = row;
        let data: any;
        if (modified) {
          data = {...row.data};
          if (type == 'insert') {
            /* 如果是新增数据行: 数据组织前先删除该主键值 */
            data[editableTableVariables.editableTableRowKey] = null;
            modifiedRows.insertEntities.push(data)
          } else if (type == 'update') {
            modifiedRows.updateEntities.push(data)
          } else if (type == 'delete') {
            modifiedRows.deleteEntities.push(data)
          }
        }
      }

      return modifiedRows;
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
          pageUrl: tableModel.pageUrl,
          pageMethod: tableModel.pageMethod,
          pageBaseParams: tableModel.pageBaseParams,
          pageNum: tableModel.pageNum,
          pageSize: tableModel.pageSize
        }
      },
      setVisible: (visible: boolean) => {
        componentVisible.value = visible;
      },
      setExpanded,
      load: handleLoadDataAsync,
      loadData: handleLoadData,
      addRow: handleAddRowData,
      delRow: handleDelRowData,
      editRow: handleEditRowData,
      editRows: () => {
        handleEditRowData(null, true)
      },
      cancelEdit: () => {
        handleCancelEditRowData(null, true)
      },
      getModifiedRows: getModifiedRowData
    });

    /**
     * 定义页面准备好后执行事件
     */
    onMounted(() => {
      editableTableVariables.editableTableEvents = {
        editRow: handleEditRowData,
        delRow: handleDelRowData,
        cancelEdit: handleCancelEditRowData
      }

      nextTick(() => {
        if (props.autoLoad && Objects.isEmpty(tableModel.rowData)) {
          handleLoadDataAsync({});
        }
      }).then(() => {
      });
    });

    /**
     * Table的头部定义
     */
    const tableHeader = () => {
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

    /**
     * Table的工具栏定义
     */
    const tableTopBars = (tableBar: any) => {
      const itemsAlign = tableBar?.props?.align || "left";
      return tableBar && (
          <div class={{
            "mag-view__view-bars mag-table__table-bars": true,
            "is-left-alignment": itemsAlign === "left",
            "is-right-alignment": itemsAlign === "right",
            "is-center-alignment": itemsAlign === "center"
          }}>
            <MagTableBar {...tableBar.props} {...tableBar.attrs}>
              {tableBar.children?.default?.()}
            </MagTableBar>
          </div>
      )
    }

    /**
     * Table的分页节点定义
     */
    const tablePaginationBar = () => {
      const itemsAlign = props?.pageAlign || "left";
      return props.usePage && (
          <div class={{
            "mag-table__table-page-bars": true,
            "is-left-alignment": itemsAlign === "left",
            "is-right-alignment": itemsAlign === "right",
            "is-center-alignment": itemsAlign === "center"
          }}>
            <MagTablePagination layout={props.pageLayout}
                                size={props.size === "large" ? props.size : "default"}
                                page-sizes={props.pageSizes}
                                total={tableModel.rowTotal}
                                page-bars={props.pageBars}
                                v-model:current-page={tableModel.pageNum}
                                v-model:page-size={tableModel.pageSize}
                                onCurrentChange={handleCurrentChange}
                                onSizeChange={handleSizeChange}
                                onSearch={handlePaginationSearch}
                                background/>
          </div>
      )
    }

    /**
     * 计算表格高度
     *
     * @param existsTbar
     * @param existsPaginationBar
     */
    const calculateTableHeight = (existsTbar: boolean, existsPaginationBar: boolean) => {
      let height = "100%";

      if (existsTbar) {
        height += ' - 40px';
      }

      if (existsPaginationBar) {
        height += ' - 40px';
      }

      return `calc(${height})`;
    }

    /**
     * 定义返回模板
     */
    return () => {
      let childNodes: any = slots?.default?.();
      let tableBar: any = null, tabCols: any = [];
      editableTableVariables.editableTableColumns = {};

      if (props.rowCheckbox) {
        tabCols.push(<ElTableColumn type="selection" prop="rowCheckbox" label=" " width={60} selectable={props.selectableHandler}/>);
      }

      if (props.rowIndex) {
        tabCols.push(<ElTableColumn type="index" prop="rowIndex" label="序号" width={60} fixed={true}/>);
      }

      childNodes.map((node: any) => {
        if (node?.type?.name && node?.type?.name === MagTableBar.name) {
          tableBar = node;
        } else if (node?.type?.name && node?.type?.name.startsWith(MagTableColumn.name)) {
          tabCols.push(node);
          node?.props?.editable
          && (editableTableVariables.editableTable = true)
          && (editableTableVariables.editableTableColumns[node?.props?.prop] = {
            prop: node?.props?.prop,
            node: node?.children?.default?.()[0]
          })
        }
      });

      /**
       * 定义返回模板
       */
      return <ElContainer v-show={componentVisible.value}
                          class={{
                            "mag-view-card-layout is-shadow-layout": props.shadow,
                            "is-expanded": componentExpanded.value,
                            "is-collapsed": !componentExpanded.value
                          }}
                          v-loading={loadingStatus.value}>
        {tableHeader()}
        <ElCollapseTransition>
          <ElMain class="mag-table__main" v-show={componentExpanded.value}>
            {tableTopBars(tableBar)}
            <ElTable {...props}
                     {...attrs}
                     data={tableModel.rowData}
                     class={{
                       "mag-table__table": true,
                       "mag-table__exist-table-bars": !attrs.border && null !== tableBar,
                       "mag-table__empty-table-bars": !attrs.border && null === tableBar
                     }}
                     height={calculateTableHeight(null != tableBar, props.usePage)}
                     show-overflow-tooltip
                     stripe>
              {tabCols}
            </ElTable>
            {tablePaginationBar()}
          </ElMain>
        </ElCollapseTransition>
      </ElContainer>
    }
  }
});

export default MagTable;
