const models = require("../models/contacts");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
const putSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const get = async (_, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    res.status(404).json({ message: "Not Found", code: 404 });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { error, value } = postSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message: "Missing required field",
        details: error.details,
      });
    }
    const { name, email, phone } = value;
    const contact = await addContact({ name, email, phone });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      await removeContact(contactId);
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else {
      return res.json({
        status: "failure",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error, value } = putSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message: "Missing fields",
      });
    }

    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    const body = value;

    if (contact) {
      await updateContact(contactId, body);
      return res.json({
        status: "success",
        code: 200,
        message: "Contact was updated",
      });
    } else {
      return res.json({
        status: "failure",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const favouriteStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field favorite" });
  }
  try {
    const result = await models.updateStatusContact(contactId, favorite);
    if (result) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
  favouriteStatus,
};
