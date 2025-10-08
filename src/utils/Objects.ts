const Objects = {
  /**
   * 判断对象是否数组
   * @param destObject
   */
  isArray(destObject: any) {
    return null != destObject
        && Object.prototype.toString.call(destObject) === '[object Array]';
  },
  /**
   * 判定对象是否为 null or undefined
   * @param destObject 目标对象
   */
  isNull(destObject: any) {
    return destObject === null
        || destObject === undefined
  },
  /**
   * 判定对象是否为空
   * @param destObject 目标对象
   */
  isEmpty(destObject: any) {
    return destObject === null
        || destObject === undefined
        || Object.keys(destObject).length === 0;
  },
  /**
   * 对象更新或者赋值
   * @param destObject 目标对象
   * @param srcObject  源对象
   * @param isUpdate   是否更新; 否则是赋值;
   */
  setObjectValues(destObject: any, srcObject: any = null, isUpdate: boolean = false) {
    if (!this.isNull(destObject)) {
      if (isUpdate && !this.isEmpty(destObject)) {
        for (let key in destObject) {
          destObject[key] = srcObject ? srcObject[key] : null;
        }
      } else {
        for (let key in srcObject) {
          destObject[key] = srcObject[key];
        }
      }
    } else {
      console.error("Call Objects.setObjectValues(): target object does not exist.");
    }
  },
  /**
   * 解析值
   * @param value
   */
  parsePropertyValue(value: string | number | null) {
    if (null == value) {
      return {
        value: value,
        unit: null,
        isPercentage: false,
        isPixel: false
      }
    }

    if (typeof value === 'number') {
      return {
        value: value,
        unit: "px",
        isPercentage: false,
        isPixel: true
      }
    }

    const stringValue = value.trim();
    if (stringValue.endsWith('%')) {
      const numericValue = parseFloat(stringValue);
      if (!isNaN(numericValue)) {
        return {
          value: numericValue,
          unit: '%',
          isPercentage: true,
          isPixel: false
        }
      }
    }

    if (stringValue.endsWith('px')) {
      const numericValue = parseFloat(stringValue);
      if (!isNaN(numericValue)) {
        return {
          value: numericValue,
          unit: 'px',
          isPercentage: false,
          isPixel: true
        }
      }
    }

    throw new Error(`Call Objects.parsePropertyValue(): invalid data format: ${value}`);
  }
}

export default Objects;
