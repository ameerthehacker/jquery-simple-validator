export const validationFn = {
  required: value => {
    if (value.length > 0) {
      return true;
    } else {
      return false;
    }
  }
};
