const version = "1.0.0";
const packageName = "jQuery Simple Validator";

if (typeof jQuery == "undefined") {
  throw new Error(`${packageName} ${version} requires jQuery 3.3.1 or higher`);
}
