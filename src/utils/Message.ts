import {h} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {QuestionFilled} from "@element-plus/icons-vue";
import {ElMessageBoxOptions} from "element-plus/es/components/message-box/src/message-box.type";

/**
 * 定义回调类型
 */
type Callback = Function | undefined;

/**
 * 简化定义消息类
 */
class Msg {
  /**
   * 显示框
   * @param message
   * @param type
   * @param callback
   */
  show(message: any,
       type: any = 'info',
       callback?: Callback) {

    if (!message) {
      return;
    }
    let callbackFn = () => {
      if (callback) callback()
    };
    ElMessage({
      message: message,
      type: type,
      grouping: true,
      showClose: true,
      duration: 2000,
      dangerouslyUseHTMLString: true,
      onClose: callbackFn
    });
  }

  /**
   * 确定框
   * @param message
   * @param title
   * @param okCallback
   * @param cancelCallback
   */
  confirm(message: string,
          title = '系统提示',
          okCallback?: Callback,
          cancelCallback?: Callback) {

    if (!message) {
      return;
    }

    ElMessageBox.confirm(message, title, <ElMessageBoxOptions>{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      icon: h(QuestionFilled),
      buttonSize: 'default'
    }).then(async () => {
      try {
        /* 确定 */
        const okCallback__ = okCallback || function () {
        };
        await okCallback__();
      } catch (error) {
        /* 异常 */
      }
    }).catch(async () => {
      /* 取消 */
      const cancelCallback__ = cancelCallback || function () {
      };
      await cancelCallback__();
    });
  }

  /**
   * 提示框
   * @param message
   * @param title
   */
  prompt(message: any,
         title = '系统提示',
         okCallback?: Callback,
         cancelCallback?: Callback) {

    if (!message) {
      return;
    }

    ElMessageBox.prompt(message, title, <ElMessageBoxOptions>{
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(async ({value}) => {
      try {
        /* 确定 */
        const okCallback__ = okCallback || function () {
        };
        await okCallback__(value);
      } catch (error) {
        /* 异常 */
      }
    }).catch(async () => {
      /* 取消 */
      const cancelCallback__ = cancelCallback || function () {
      };
      await cancelCallback__();
    });
  }

  info(msg: any, callback?: Callback) {
    this.show(msg, 'info', callback)
  }

  success(msg: any, callback?: Callback) {
    this.show(msg, 'success', callback)
  }

  warning(msg: any, callback?: Callback) {
    this.show(msg, 'warning', callback)
  }

  error(msg: any, callback?: Callback) {
    this.show(msg, 'error', callback)
  }
}

const Message: Msg = new Msg();

export default Message;