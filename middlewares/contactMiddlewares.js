const { getById } = require("../models/contacts");
const { schema } = require("../schema/contactSchema");

exports.isBodyEmpty = ({ body }, res, next) => {
  if (!Object.keys(body).length) {
    return res.status(400).json({
      message: "missing fields",
    });
  }
  next();
};

exports.validationFields = ({ body }, res, next) => {
  const requiredFields = ["name", "phone", "email"];

  const validatedBody = schema.validate(body);
  if (validatedBody.error) {
    const { label } = validatedBody.error.details[0].context;
    const message = requiredFields.includes(label)
      ? `missing required ${label} field`
      : ` ${label} field is unnecessary, please remove it`;
    return res.status(400).json({ message });
  }
  next();
};

exports.isIdExist = async ({ params }, res, next) => {
  const { contactId } = params;
  const contact = await getById(contactId);
  if (!contact) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  next();
};
