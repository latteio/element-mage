/* 全局样式文件 */
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

/* 自定义配置: ElementPlus, 国际化 */
import ElementPlus from "element-plus";
import elEn from "element-plus/es/locale/lang/en";
import elZhCn from "element-plus/es/locale/lang/zh-cn";

/* 自定义组件: 类型, 组件, 实用工具 */
import "@/styles/element-mage.scss";
import {AppConfiguration} from "@/element-mage-types";
import {apiRequestInstaller} from "@/utils/ApiRequest";
import {appStorageInstaller} from "@/utils/AppStorage";
import Message from "@/utils/Message";
import Objects from "@/utils/Objects";
import Strings from "@/utils/Strings";
import ErrorHandler from "@/utils/ErrorHandler";

/* 自定义组件: 按钮, 导航类 */
import MagFlexComponent from "@/components/basic/MagFlexComponent";
import MagButton from "@/components/basic/MagButton";
import MagConfirmButton from "@/components/basic/MagConfirmButton";
import MagButtonGroup from "@/components/basic/MagButtonGroup";
import MagLink from "@/components/basic/MagLink";
import MagDropdown from "@/components/basic/MagDropdown";
import MagTitle from "@/components/basic/MagTitle";
import MagDivider from "@/components/basic/MagDivider";

/* 自定义组件: 视图布局组件, Tab组件 */
import MagBorderLayout from "@/components/layout/MagBorderLayout";
import MagStackLayout from "@/components/layout/MagStackLayout";
import MagPane from "@/components/pane/MagPane";
import MagTabGroup from "@/components/tab/MagTabGroup";
import MagTab from "@/components/tab/MagTab";

/* 自定义组件: 表单及表单元素组件 */
import MagForm from "@/components/form/MagForm";
import MagFormBar from "@/components/form/MagFormBar";
import MagHidden from "@/components/form/MagHidden";
import MagText from "@/components/form/MagText";
import MagInput from "@/components/form/MagInput";
import MagInputNumber from "@/components/form/MagInputNumber";
import MagInputArea from "@/components/form/MagInputArea";
import MagInputTag from "@/components/form/MagInputTag";
import MagInputButton from "@/components/form/MagInputButton";
import MagSelect from "@/components/form/MagSelect";
import MagSelectDate from "@/components/form/MagSelectDate";
import MagSelectTime from "@/components/form/MagSelectTime";
import MagSelectTable from "@/components/form/MagSelectTable";
import MagSelectTree from "@/components/form/MagSelectTree";
import MagSwitch from "@/components/form/MagSwitch";
import MagUpload from "@/components/form/MagUpload";
import MagUploadDialog from "@/components/form/MagUploadDialog";

/* 自定义组件: 对话框, 抽屉, 子页面 */
import MagDialog from "@/components/dialog/MagDialog";
import MagDrawer from "@/components/dialog/MagDrawer";
import MagPage from "@/components/page/MagPage";

/* 自定义组件: 表格相关 */
import MagTable from "@/components/table/MagTable";
import MagTableBar from "@/components/table/MagTableBar";
import MagTableColumn from "@/components/table/MagTableColumn";
import MagTableColumnButtons from "@/components/table/MagTableColumnButtons";
import MagEditButton from "@/components/table/MagEditButton";
import MagDeleteButton from "@/components/table/MagDeleteButton";
import MagTableColumnSwitch from "@/components/table/MagTableColumnSwitch";
import MagTableColumnTag from "@/components/table/MagTableColumnTag";
import MagTablePagination from "@/components/table/MagTablePagination";

/* 自定义组件: 树相关 */
import MagTree from "@/components/tree/MagTree";
import MagTreeBar from "@/components/tree/MagTreeBar";

/* 自定义组件导出集 */
const components: any = {
  // 基础组件
  ...{"MagFlexComponent": MagFlexComponent},
  ...{"MagButton": MagButton},
  ...{"MagConfirmButton": MagConfirmButton},
  ...{"MagButtonGroup": MagButtonGroup},
  ...{"MagLink": MagLink},
  ...{"MagTitle": MagTitle},
  ...{"MagDivider": MagDivider},
  // 容器, 视图布局组件, Tab组件
  ...{"MagBorderLayout": MagBorderLayout},
  ...{"MagStackLayout": MagStackLayout},
  ...{"MagPane": MagPane},
  ...{"MagTabGroup": MagTabGroup},
  ...{"MagTab": MagTab},
  // 表单组件
  ...{"MagForm": MagForm},
  ...{"MagFormBar": MagFormBar},
  ...{"MagHidden": MagHidden},
  ...{"MagText": MagText},
  ...{"MagInput": MagInput},
  ...{"MagInputNumber": MagInputNumber},
  ...{"MagInputArea": MagInputArea},
  ...{"MagInputTag": MagInputTag},
  ...{"MagInputButton": MagInputButton},
  ...{"MagSelect": MagSelect},
  ...{"MagSelectDate": MagSelectDate},
  ...{"MagSelectTime": MagSelectTime},
  ...{"MagSelectTable": MagSelectTable},
  ...{"MagSelectTree": MagSelectTree},
  ...{"MagDropdown": MagDropdown},
  ...{"MagSwitch": MagSwitch},
  ...{"MagUpload": MagUpload},
  ...{"MagUploadDialog": MagUploadDialog},
  // 对话框, 页面组件
  ...{"MagDialog": MagDialog},
  ...{"MagDrawer": MagDrawer},
  ...{"MagPage": MagPage},
  // 表格组件
  ...{"MagTable": MagTable},
  ...{"MagTableBar": MagTableBar},
  ...{"MagTableColumn": MagTableColumn},
  ...{"MagTableColumnButtons": MagTableColumnButtons},
  ...{"MagEditButton": MagEditButton},
  ...{"MagDeleteButton": MagDeleteButton},
  ...{"MagTableColumnSwitch": MagTableColumnSwitch},
  ...{"MagTableColumnTag": MagTableColumnTag},
  ...{"MagTablePagination": MagTablePagination},
  // 树相关
  ...{"MagTree": MagTree},
  ...{"MagTreeBar": MagTreeBar},
}

/**
 * 组件注册方法
 * @param app
 * @param options
 */
const install = function (app: any, options: AppConfiguration) {
  /* 注册全局变量 */
  app.config['mag_app__app_code'] = options?.code || "NA";

  /* 注册全局方法: 全局错误 Handler */
  app.config.errorHandler = ErrorHandler;
  const {Local, Session} = appStorageInstaller(options);
  const {ApiRequest} = apiRequestInstaller(options, Session);
  app.provide("mag_app__local", Local);
  app.provide("mag_app__session", Session);
  app.provide("mag_app__api_request", ApiRequest);

  /* 注册 ElementPlus + 国际化 */
  /* 注册国际化 */
  const lang: string = options?.lang || 'zh-cn';
  const {zh_cn, en} = options?.locales;
  const messages: any = {
    "zh-cn": {
      ...elZhCn,
      ...zh_cn
    },
    "en": {
      ...elEn,
      ...en
    }
  };
  app.use(ElementPlus, {locale: messages[lang]});

  /* 注册全局组件 */
  for (let compo in components) {
    app.component(compo, components [compo]);
  }
}

/**
 * 导出所有自定义组件
 */
export {
  /* 自定义组件: 按钮, 导航类 */
  MagFlexComponent,
  MagButton,
  MagConfirmButton,
  MagButtonGroup,
  MagLink,
  MagDropdown,
  MagTitle,
  MagDivider,
  /* 自定义组件: 视图布局组件, Tab组件 */
  MagBorderLayout,
  MagStackLayout,
  MagPane,
  MagTabGroup,
  MagTab,
  /* 自定义组件: 表单及表单元素组件 */
  MagForm,
  MagFormBar,
  MagHidden,
  MagText,
  MagInput,
  MagInputNumber,
  MagInputArea,
  MagInputTag,
  MagInputButton,
  MagSelect,
  MagSelectDate,
  MagSelectTime,
  MagSelectTable,
  MagSelectTree,
  MagSwitch,
  MagUpload,
  MagUploadDialog,
  /* 自定义组件: 对话框, 抽屉, 子页面 */
  MagDialog,
  MagDrawer,
  MagPage,
  /* 自定义组件: 表格相关 */
  MagTable,
  MagTableBar,
  MagTableColumn,
  MagTableColumnButtons,
  MagEditButton,
  MagDeleteButton,
  MagTableColumnSwitch,
  MagTableColumnTag,
  MagTablePagination,
  /* 自定义组件: 树相关 */
  MagTree,
  MagTreeBar,
}

export default {
  install,
  utils: {
    apiRequestInstaller,
    appStorageInstaller,
    Objects,
    Strings,
    Message
  }
}
