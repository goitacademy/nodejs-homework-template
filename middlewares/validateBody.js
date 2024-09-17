const { HttpError } = require("../helpers");
const { authSchemas } = require("../models");

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
      let errorMessage = null;
      switch (req.method) {
        case "POST":
          errorMessage = `Missing required <${errorFields}> field${isPluralError}`;
          break;
        case "PUT":
          errorMessage =
            errorFields === "favorite" ? `Field <${errorFields}> not allowed` : `Invalid value on <${errorFields}> field${isPluralError}`;
          break;
        case "PATCH":
          errorMessage = `Field${isPluralPatchError} <${patchFields}> not allowed`;
          break;
        default:
      }
      if (schema === authSchemas.registerSchema || schema === authSchemas.loginSchema) {
        errorMessage = "<Помилка від Joi або іншої бібліотеки валідації>";
      }
      if (schema === authSchemas.updateSubSchema) {
        errorMessage = "Field <subscription> must be one of 'starter', 'pro' or 'business' values";
      }
      next(HttpError(400, errorMessage));
    }
    next();
  };
  return func;
};

module.exports = {
  isBody,
  validateBody,
};
