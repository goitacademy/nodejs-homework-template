const { HttpError } = require("../helpers");

const isBody = (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    if (req.method === "PATCH") {
      next(HttpError(400, "Missing field <favorite>"));
    }
    next(HttpError(400, "Missing fields"));
  }
  if ((req.method !== "PUT") & !Object.keys(req.body).includes("favorite")) {
    next(HttpError(400, "Missing field <favorite>"));
  }
  next();
};

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.log(error);
      const fields = [];
      const fieldsToPatch = [];
      error.details.map(el => {
        if (el.context.label !== "value") {
          fields.push(el.context.label);
        }
        if (el.context.label !== "favorite") {
          fieldsToPatch.push(el.context.label);
        }
        return null;
      });
      const errorFields = fields.join(", ");
      const patchFields = fieldsToPatch.join(", ");
      const isPluralError = fields.length > 1 ? "s" : "";
      const isPluralPatchError = patchFields.length > 1 ? "s" : "";
      const errorMessage = () => {
        switch (req.method) {
          case "POST":
            return `Missing required <${errorFields}> field${isPluralError}`;
          case "PUT":
            return errorFields === "favorite" ? `Field <${errorFields}> not allowed` : `Invalid value on <${errorFields}> field${isPluralError}`;
          case "PATCH":
            return `Field${isPluralPatchError} <${patchFields}> not allowed`;
          default:
        }
      };
      next(HttpError(400, errorMessage()));
    }
    next();
  };
  return func;
};

module.exports = {
  isBody,
  validateBody,
};
