import {AppConfiguration, AppProfile} from "@/element-mage-types";

export const appConfig: AppConfiguration = {
  code: "Latte",
  name: "XXX系统",
  version: "4.x",
  active: "dev",
  profiles: {
    dev: {
      name: "开发",
      appBase: "/",
      apiBaseUrl: "http://localhost:18080/platform/",
      apiLoginUrl: "/"
    },
    demo: {
      name: "验证",
      appBase: "/",
      apiBaseUrl: "http://localhost:18080/platform/",
      apiLoginUrl: "/"
    },
    prod: {
      name: "正式",
      appBase: "/",
      apiBaseUrl: "http://192.168.20.130:18080/platform/",
      apiLoginUrl: "/"
    }
  },
  lang: 'zh-cn',
  locales: {zh_cn: {}, en: {}},
  logo: null,
  theme: '',
  layout: 'menu',
  layoutMobile: false,
  layoutTags: true,
  menuIsCollapse: false,
  menuUniqueOpened: false,
  dashboardUrl: '/',
  rsaPublicKey: '30820122300d06092a864886f70d01010105000382010f003082010a0282010100981e4994785fb0ac7b153b8f85a159decbef6570f8899b0f5232c3af6f14dacba81969435f87f3fd584da9435056cbd4cc19f11254f13e33ebc1782d53d2548af03e7012d6513d45224c42b54b96dfa75207c6c647b9e1eea33eb7f0b13bec48af13436c00de4675fcd6e6f2cc5d3b4291817ad7d1bb09214c956f12af0ee382f3b55b6bfbd1176f39e727a7f9891ad80ac1d2b615f39add797564a7bf0b99f50ee2a0e5dfa7deb4d9206f2bb05cb20f9cfc752529dff6da2df89246ab05f75971228b376508fc8c8177b85791d801f4d89a85e6a0f47e779a2e8747ff2e4fd7594441a7e9aebf4cfd7cdde36696542370c0cbfa51b4154f2a402c66b49df3b50203010001'
}

export const appProfile: AppProfile = appConfig.profiles[appConfig.active];
