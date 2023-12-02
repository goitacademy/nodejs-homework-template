const checkForSyntax = require("./checkForSyntax");

const checkForRequiredKeys = (object) => {
  const requiredKeys = ["name", "email", "phone"];

  if (!requiredKeys.every((key) => object.hasOwnProperty(key)))
    return { message: "missing required name field", isCorrect: false };

  checkForSyntax(object);

  return { isCorrect: true };
};

module.exports = checkForRequiredKeys;