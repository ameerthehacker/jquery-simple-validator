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
  },
  match: obj => {
    // Get the other field with which the value is to be matched
    const otherInput = $($(obj.input).attr("data-match-field"));

    if (otherInput.prop(obj.property) == obj.value) {
      return true;
    } else {
      return false;
    }
  },
  fileTypes: obj => {
    const selectedFiles = obj.input.files;
    const allowedFileTypes = $(obj.input)
      .attr("data-file-types")
      .split(",");
    let valid = false;

    Object.values(selectedFiles).forEach(file => {
      if (typeof file == "object") {
        valid = allowedFileTypes.find(allowedFileType => {
          return file.type == allowedFileType;
        });
        if (!valid) {
          return;
        }
      }
    });

    return valid;
  },
  fileMaxSize: obj => {
    const selectedFiles = obj.input.files;
    const maxFileSize = $(obj.input)
      .attr("data-file-max-size")
      .toLowerCase();
    let maxFileSizeInBytes = 0;
    let valid = true;

    maxFileSizeInBytes = getFileSizeInBytes(maxFileSize);
    Object.values(selectedFiles).forEach(file => {
      if (typeof file == "object") {
        if (file.size > maxFileSizeInBytes) {
          valid = false;
        }
      }
      if (!valid) {
        return;
      }
    });

    return valid;
  },
  fileMinSize: obj => {
    const selectedFiles = obj.input.files;
    const minFileSize = $(obj.input)
      .attr("data-file-min-size")
      .toLowerCase();
    let minFileSizeInBytes = 0;
    let valid = true;

    minFileSizeInBytes = getFileSizeInBytes(minFileSize);
    Object.values(selectedFiles).forEach(file => {
      if (typeof file == "object") {
        if (file.size < minFileSizeInBytes) {
          valid = false;
        }
      }
      if (!valid) {
        return;
      }
    });

    return valid;
  },
  isNumber: obj => {
    if ($.isNumeric(obj.value)) {
      return true;
    } else {
      return false;
    }
  },
  max: obj => {
    const maxValue = parseInt($(obj.input).attr("max"));

    if (obj.value < maxValue) {
      return true;
    } else {
      return false;
    }
  },
  min: obj => {
    const minValue = parseInt($(obj.input).attr("min"));

    if (obj.value > minValue) {
      return true;
    } else {
      return false;
    }
  }
};

/**
 * Gets the file size in human readable string form such as 1kb, 1mb returns it in bytes as number
 * @param {String} size File size represented as 1kb, 1mb or 1gb etc.
 * @returns {Number} The size in number as bytes
 */
function getFileSizeInBytes(size) {
  if (size.endsWith("kb")) {
    return parseInt(size) * 1024;
  } else if (size.endsWith("mb")) {
    return parseInt(size) * 1024 * 1024;
  } else if (size.endsWith("gb")) {
    return parseInt(size) * 1024 * 1024 * 1024;
  }
}
