import { validationFn } from "./validations";

/**
 * Validates all the forms with attribute validate
 */
export const validateForms = () => {
  // Get all the forms
  const forms = $("form[validate=true]").toArray();

  forms.forEach((form, index) => {
    // Set an unique id for each form
    $(form).attr("data-uid", `form-${index}`);
    validateForm(form);
  });
};

/**
 * Validate the form object passed to it
 * @param {Object} form jQuery form object
 */
const validateForm = form => {
  // Get all the inputs in the form
  const inputs = $(form)
    .find("input")
    .toArray();
  validateInputs(inputs);
};

/**
 * Validate the array of input fields passed to it
 * @param {Array<Object>} inputs
 */
const validateInputs = inputs => {
  inputs.forEach((input, index) => {
    // Get the form uid
    const formUID = $(input)
      .parent("form")
      .attr("data-uid");
    // Set an unique id for each form
    $(input).attr("data-uid", `${formUID}-field-${index}`);
    $(input).on("blur", evt => {
      if ($(input).attr("required")) {
        validate(input, "value", validationFn.required);
      }
    });
  });
};

/**
 * Validate a particular property of the input object
 * @param {Object} input Input Object to be validated
 * @param {String} property Property of input that is to be validated
 * @param {Function} validation Validation function to be applied
 */
const validate = (input, property, validation) => {
  const errorContainer = initErrorContainer(input);

  if (!validation($(input).prop(property))) {
    $(input).addClass("error");
    errorContainer.innerHTML = "This field is required";
  } else {
    $(input).removeClass("error");
    errorContainer.remove();
  }
};

/**
 * Returns the error container below input field and creates one if not exists
 * @param {Object} input Input object below which error field is to be created
 * @returns {Object} Error Container in which error is to be displayed
 */
const initErrorContainer = input => {
  const inputUID = $(input).attr("data-uid");
  const errorContainerUID = `${inputUID}-error`;
  let errorContainer;

  // Check if error container already exists
  if ($(`#${errorContainerUID}`).length == 0) {
    console.log($(`#${errorContainerUID}`).length);
    errorContainer = document.createElement("div");
    errorContainer.setAttribute("id", errorContainerUID);
    errorContainer.className = "error-field";
    $(input).after(errorContainer);
  } else {
    errorContainer = document.getElementById(errorContainerUID);
  }

  return errorContainer;
};
