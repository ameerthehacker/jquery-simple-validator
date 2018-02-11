export const validationFn = {
  required: value => {
    if (value.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  email: value => {
    const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegEx.test(value)) {
      return true;
    } else {
      return false;
    }
  }
};
