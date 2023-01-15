export default {
  isPropertySimpleType: (object: any, name: string, type: string) => {
    if (!object[name]) {
      return false;
    }
    if (typeof object[name] !== type) {
      return false;
    }
    return true;
  },
  isPropertyArrayType: (object: any, name: string) => {
    if (!object[name]) {
      return false;
    }
    const array = object[name];
    if (!Array.isArray(array)) {
      return false;
    }
    if (array.length === 0) {
      return true;
    }
    let flag = true;
    array.forEach((value) => {
      if (typeof value !== 'string') {
        flag = false;
      }
    });
    return flag;
  },
};
