import Joi from "joi";

export const isStr = (v) => typeof v === "string";

export const isValidEmail = (v, options = { minDomainSegments: 2 }) => {
  const { error } = Joi.string().email(options).validate(v);
  return !error;
};

export const detailSrvErrMsg = ({ method, url } = {}, message) => {
  return { path: `${method} ${url}`, message };
};

export const setJoiShapeTrimAll = (shape) => {
  Object.entries(shape).forEach(([key, field]) => {
    if (field.type === "string") shape[key] = field.trim();
  });
};

export const setMongooseShapeTrimAll = (shape) => {
  Object.entries(shape).forEach(([, field]) => {
    if (field.type === String) field.trim = true;
  });
};
