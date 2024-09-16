const changeOutputMessage = (message) => {
  let outputMessage = message;

  const index = message.indexOf("is required");
  if (index !== -1) {
    const fieldName = message.substring(1, message.length - 13);
    outputMessage = `missing required ${fieldName} field`;
  }

  if (message.includes("must contain at least one of")) {
    outputMessage = "missing fields";
  }

  return outputMessage;
};

module.exports = changeOutputMessage;