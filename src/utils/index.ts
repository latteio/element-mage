import * as ElementMage from '@/element-mage';
import {appConfig} from "@/configs/appConfig";

const Objects = ElementMage.default.utils.Objects;
const Message = ElementMage.default.utils.Message;
const {Local, Session} = ElementMage.default.utils.appStorageInstaller(appConfig);
const {ApiRequest} = ElementMage.default.utils.apiRequestInstaller(appConfig, Session);

export {
    Objects,
    Local,
    Session,
    ApiRequest,
    Message
}
