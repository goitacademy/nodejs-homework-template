const fs = require("fs").promises;
const Joi = require("joi");
const catchAsync = require("../utils/catchAsync");

const CONTACTS_FILE_PATH = "./models/contacts.json";

const validateContactBody = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().required(),
  });
  console.log(req.body);
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const { details } = error;
    const errorMessage = details
      .map((i) => {
        if (i.type === "any.required") {
          return i.context.label;
        }
        return i.message;
      })
      .join(", ");
    return res
      .status(400)
      .json({ message: `Missing required ${errorMessage} field.` });
  }

  next();
};

const validateContactId = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const contacts = JSON.parse(await fs.readFile(CONTACTS_FILE_PATH, "utf-8"));
  const isContactFound = contacts.find(({ id }) => id === contactId);

  if (!isContactFound) {
    const err = new Error("Not found");
    err.status = 404;
    return next(err);
  }

  next();
});

module.exports = {
  validateContactId,
  validateContactBody,
};
