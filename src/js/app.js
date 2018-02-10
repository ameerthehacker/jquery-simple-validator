import { validateForms } from "./validator";

/**
 * Current Stable version of jQuery Simple Validator
 */
const version = "1.0.0";
/**
 * Package name of the distribution
 */
const packageName = "jQuery Simple Validator";

if (typeof jQuery == "undefined") {
  throw new Error(`${packageName} ${version} requires jQuery 3.3.1 or higher`);
}

$(() => {
  validateForms();
});
