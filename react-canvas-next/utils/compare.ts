/**
 * 深度比较两个对象是否相等
 */
export function deepCompare(obj1: any, obj2: any): boolean {
  // 类型不同则不相等
  if (typeof obj1 !== typeof obj2) {
    return false;
  }
  // 基本类型比较
  if (typeof obj1 !== 'object') {
    return obj1 === obj2;
  }

  // 如果两个对象都是数组，则比较它们的长度和每个元素
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!deepCompare(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }

  // 如果两个对象的属性数量不同，则它们不相等
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  // 属性名有区别则
  for (let i = 0; i < obj1Keys.length; i++) {
    if (!obj2Keys.includes(obj1Keys[i])) {
      return false;
    }
  }

  // 比较每个属性的值
  for (let i = 0; i < obj1Keys.length; i++) {
    const key = obj1Keys[i];
    if (!deepCompare(obj1[key], obj2[key])) {
      return false;
    }
  }

  // 如果所有属性都相等，则两个对象相等
  return true;
}