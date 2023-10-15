export const addFieldMongoose = ({
  regExp,
  errorMessage,
  requiredErrorMessage,
}) => {
  return {
    type: String,
    match: [regExp, errorMessage],
    required: [true, requiredErrorMessage],
  };
};

const messagesErrorsJoi = (message) => {
  return {
    "string.empty": "missing required {#label} field",
    "any.required": "missing required {#label} field",
    "string.pattern.base": message,
  };
};

export function addFieldJoi({ regExp, errorMessage }) {
  return this.string()
    .required()
    .pattern(new RegExp(regExp))
    .messages(messagesErrorsJoi(errorMessage));
}
