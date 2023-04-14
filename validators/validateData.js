const Joi = require("joi");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join("models", "contacts.json");

const contactValidatePost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const contactValidatePut = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

async function validateGetById(req, res, next) {
  const { contactId } = req.params;
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data).filter((elem) => elem.id === contactId);
  if (contacts.length === 0) {
    res.status(404).json({ message: "Not found" });
  } else next();
}

function validatePost(req, res, next) {
  const body = req.body;
  const { error } = contactValidatePost.validate(body);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  let missingField;

  if (!body.name) {
    missingField = "name";
  } else if (!body.email) {
    missingField = "email";
  } else if (!body.phone) {
    missingField = "phone";
  }

  if (missingField) {
    return res.status(400).json({
      message: `Missing required ${missingField} field.`,
    });
  }

  next();
}

async function validateDelete(req, res, next) {
  const { contactId } = req.params;
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const contactToDel = contacts.find((elem) => elem.id === contactId);
  if (!contactToDel) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  next();
}

async function validateUpdate(req, res, next) {
  const body = req.body;
  const { contactId } = req.params;
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data).filter((elem) => elem.id === contactId);
  if (contacts.length === 0) {
    res.status(404).json({ message: "Not found " });
    return;
  }
  if (!body.name && !body.email) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const { error } = contactValidatePut.validate(body);
  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
}

module.exports = {
  validateGetById,
  validatePost,
  validateDelete,
  validateUpdate,
};
