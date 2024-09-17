const Joi = require("joi");

const validateBody = require("../helpers/validateBody");

const updateAvatarValid = validateBody(
  Joi.object({
    payload: { files: Joi.array().items(Joi.any()) },
  }),
  "Please provide at least one file for updating the avatar."
);

module.exports = { updateAvatarValid };
