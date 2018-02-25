import { validationFn } from "../src/js/validations";
import $ from "jquery";
import { validateForms } from "../src/js/validator";

// Setup jQuery
beforeAll(() => {
  global.$ = global.jQuery = $;
});
describe("Testing Validation Functions", () => {
  // Test for required validator
  describe("Testing Required Validator", () => {
    test("Empty value for required validator returns false", () => {
      expect(validationFn.required({ value: "" })).toBeFalsy();
    });
    test("Non empty value for required validator returns true", () => {
      expect(validationFn.required({ value: "something" })).toBeTruthy();
    });
  });
  // Test for email validator
  describe("Testing Email Validator", () => {
    test("Valid email address should return true", () => {
      expect(validationFn.email({ value: "someone@example.com" })).toBeTruthy();
    });
    test("Invalid email address should return false", () => {
      expect(validationFn.email({ value: "someone@.com" })).toBeFalsy();
    });
  });
  // Test for url validator
  describe("Testing URL Validator", () => {
    test("Valid URL should return true", () => {
      expect(
        validationFn.url({ value: "http://www.example.com" })
      ).toBeTruthy();
    });
    test("Invalid URL should return false", () => {
      expect(validationFn.url({ value: "http:/www.example.com" })).toBeFalsy();
    });
  });
  describe("Testing Mobile Validator", () => {
    // Test for url validator
    test("Valid mobile number should return true", () => {
      expect(validationFn.mobile({ value: "9566602688" })).toBeTruthy();
    });
    test("Invalid mobile number should return false", () => {
      expect(validationFn.url({ value: "956660268" })).toBeFalsy();
    });
  });
  // Test for isNumber validator
  describe("Testing Numeric Validator", () => {
    test("Numeric value should return true", () => {
      expect(validationFn.isNumber({ value: 55 })).toBeTruthy();
    });
    test("Non numeric value should return false", () => {
      expect(validationFn.isNumber({ value: "alpha" })).toBeFalsy();
    });
  });
});

describe("Testing the DOM activities", () => {
  let $form1 = {},
    $form2 = {};
  let $requiredField = {};

  beforeEach(() => {
    // Set the required html content
    document.body.innerHTML = `
      <form id="form1" validate="true">
        <input id="required-field" type="text" required>
      </form>
      <form id="form2">
      </form>
    `;
    validateForms();
    // Capture the form objects
    $form1 = $("#form1");
    $form2 = $("#form2");
    $requiredField = $("#required-field");
  });
  // Test for validating forms
  describe("Testing form validator", () => {
    test("Should add novalidate to all forms with validate=true", () => {
      expect($form1.attr("novalidate")).toBeTruthy();
    });
    test("Should not add novalidate to forms without validate=true", () => {
      expect($form2.attr("novalidate")).toBeFalsy();
    });
  });
  describe("Testing required validator", () => {
    test("Should add error class when invalid", () => {
      expect($requiredField.hasClass("error")).toBeFalsy();
      // Focus and remove focus from the field
      $requiredField.focus();
      $requiredField.blur();
      expect($requiredField.hasClass("error")).toBeTruthy();
    });
    test("Should remove error class when valid", () => {
      $requiredField.addClass("error");
      $requiredField.focus();
      $requiredField.val("something");
      $requiredField.blur();
      expect($requiredField.hasClass("error")).toBeFalsy();
    });
    test("Should add no-error class when valid", () => {
      $requiredField.focus();
      $requiredField.val("something");
      $requiredField.blur();
      expect($requiredField.hasClass("no-error")).toBeTruthy();
    });
    test("Should remove no-error class when invalid", () => {
      $requiredField.addClass("error");
      $requiredField.focus();
      $requiredField.blur();
      expect($requiredField.hasClass("no-error")).toBeFalsy();
    });
    test("Should add error container if invalid", () => {
      $requiredField.focus();
      $requiredField.blur();
      expect($requiredField.next(".error-field").length).toBe(1);
    });
    test("Should show error message", () => {
      $requiredField.focus();
      $requiredField.blur();
      expect($requiredField.next(".error-field").text()).toEqual(
        "This field is required"
      );
    });
  });
});
