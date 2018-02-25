import { validationFn } from "../src/js/validations";
import $ from "jquery";

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
    test("Valid URL should return false", () => {
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
