const fsPromises = require("fs").promises;
const Joi = require("joi");

exports.checkContactData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().required(),
  });

  const errorValidation = schema.validate(req.body).error;
  if (errorValidation) {
    const fieldName = errorValidation.details[0].context.key;

    return res
      .status(400)
      .json({ message: `missing required '${fieldName}' field` });
  }

  next();
};

exports.checkContactBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }

  next();
};

exports.checkContactId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bufferData = await fsPromises.readFile("./models/contacts.json");
    const contacts = JSON.parse(bufferData);

    const contact = contacts.find((item) => item.id === id);

    if (contact) {
      req.contact = contact;
      return next();
    }

    return res.status(404).json({ message: "Not found" });
  } catch (err) {
    next(err);
  }
};
