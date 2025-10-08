import {defineComponent, h, ref} from "vue";
import {ElAside, ElContainer, ElFooter, ElHeader, ElMain} from "element-plus";
import {baseProps} from "@/components/defineViewComponent";

const MagBorderLayout = defineComponent({
  name: "MagBorderLayout",
  props: {...baseProps},
  setup(props, {slots, expose}) {
    const componentVisible = ref(props.visible);

    /* 获取子级视图的 ViewMap */
    const childViewMap: any = {
      north: null,
      south: null,
      west: null,
      east: null,
      center: null
    };

    const childNodes: any = slots?.default?.();
    for (let childNode of childNodes) {
      if (!childNode?.props || !childNode?.props?.region) continue;
      childViewMap[childNode?.props?.region] = {
        props: {...childNode.props, padding: props?.padding},
        vNode: () => h(childNode)
      };
    }

    /**
     * 定义容器内各个方向布局的代码模板
     */
    const northTemplate = () => {
      const regionNode: any = childViewMap["north"];
      if (!regionNode) {
        return null;
      }

      let componentPadding = regionNode.props.padding + "px";
      let componentHeight = regionNode.props.height || '100%';
      componentHeight = typeof (componentHeight) === 'string' ? (componentHeight === '100%' ? 'auto' : componentHeight) : (componentHeight + "px");
      let styles = `height: ${componentHeight}; padding: ${componentPadding};`;
      return <ElHeader class="mag-view-border-layout__north" style={styles}>{regionNode["vNode"]()}</ElHeader>
    }

    const southTemplate = () => {
      const regionNode: any = childViewMap["south"];
      if (!regionNode) {
        return null;
      }

      let componentPadding = regionNode.props.padding + "px";
      let componentHeight = regionNode.props.height || '100%';
      componentHeight = typeof (componentHeight) === 'string' ? (componentHeight === '100%' ? 'auto' : componentHeight) : (componentHeight + "px");
      let styles = `height: ${componentHeight}; padding: ${componentPadding};`;
      return <ElFooter class="mag-view-border-layout__south" style={styles}>{regionNode["vNode"]()}</ElFooter>
    }

    const westTemplate = () => {
      const regionNode: any = childViewMap["west"];
      if (!regionNode) {
        return null;
      }

      let componentPadding = regionNode.props.padding + "px";
      let componentWidth = regionNode.props.width || '100%';
      componentWidth = typeof (componentWidth) === 'string' ? (componentWidth === '100%' ? 'auto' : componentWidth) : (componentWidth + "px");
      let styles = `width: ${componentWidth}; padding: ${componentPadding};`;
      return <ElAside class="mag-view-border-layout__west" style={styles}>{regionNode["vNode"]()}</ElAside>
    }

    const eastTemplate = () => {
      const regionNode: any = childViewMap["east"];
      if (!regionNode) {
        return null
      }

      let componentPadding = regionNode.props.padding + "px";
      let componentWidth = regionNode.props.width || '100%';
      componentWidth = typeof (componentWidth) === 'string' ? (componentWidth === '100%' ? 'auto' : componentWidth) : (componentWidth + "px");
      let styles = `width: ${componentWidth}; padding: ${componentPadding};`;
      return <ElAside class="mag-view-border-layout__east" style={styles}>{regionNode["vNode"]()}</ElAside>
    }

    const centerTemplate = () => {
      const regionNode: any = childViewMap["center"];
      if (!regionNode) {
        return null
      }

      let componentPadding = regionNode.props.padding + "px";
      let styles = ` padding: ${componentPadding};`;
      return <ElMain class="mag-view-border-layout__center" style={styles}>{childViewMap["center"]["vNode"]()}</ElMain>
    }

    const middleTemplate = () => {
      return <ElContainer class="mag-view-border-layout__middle">
        {westTemplate()}
        {centerTemplate()}
        {eastTemplate()}
      </ElContainer>
    }

    /**
     * 定义组件外部方法
     */
    expose({
      /**
       * 设置组件可见性
       * @param visible
       */
      setVisible: (visible: boolean) => {
        componentVisible.value = visible;
      }
    });

    /**
     * 定义返回模板
     */
    return () => {
      return <ElContainer v-show={componentVisible.value} class="mag-view-border-layout">
        {northTemplate()}
        {middleTemplate()}
        {southTemplate()}
      </ElContainer>
    }
  }
});

export default MagBorderLayout;
