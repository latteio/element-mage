import {DefineComponent} from "vue";

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.vue" {
  import {DefineComponent} from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }

    interface Element extends DefineComponent {
    }
  }
}
