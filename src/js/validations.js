/**
 * Set of validation functions that can be applied
 */
export const validationFn = {
  required: obj => {
    if (obj.value) {
      return true;
    } else {
      return false;
    }
  },
  email: obj => {
    const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegEx.test(obj.value)) {
      return true;
    } else {
      return false;
    }
  },
  url: obj => {
    const urlRegEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (urlRegEx.test(obj.value)) {
      return true;
    } else {
      return false;
    }
  },
  mobile: obj => {
    const mobileRegEx = /^\d{10}$/;
    if (mobileRegEx.test(obj.value)) {
      return true;
    } else {
      return false;
    }
  },
  pattern: obj => {
    const regEx = new RegExp($(obj.input).attr("pattern"));
    if (regEx.test(obj.value)) {
      return true;
    } else {
      return false;
    }
  }
};
