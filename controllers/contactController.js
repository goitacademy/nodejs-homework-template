const Joi = require("joi");
const {
  listContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
} = require("../service");

const phonePattern =
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

const addSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }),
  phone: Joi.string().pattern(phonePattern),
  favorite: Joi.boolean(),
});

const validateSchema = (schema, res, body) => {
  const { error } = schema.validate(body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: error.details[0].message,
      data: null,
    });
  }
};

const checkID = async (_, res, next, val) => {
  try {
    const contacts = await listContacts();
    if (!contacts.find((contact) => contact.id === val)) {
      return res.status(404).json({
        status: "fail",
        code: 404,
        message: `Not found contact id: ${val}`,
        data: null,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const get = async (_, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    res.status(200).json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    validateSchema(addSchema, res, res.body);
    const newContact = await createContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: newContact },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await removeContact(req.params.contactId);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: null,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "missing fields",
        data: null,
      });
    }
    validateSchema(addSchema, res, res.body);
    const updatedContact = await updateContact(req.params.contactId, req.body);
    res.status(200).json({
      status: "success",
      code: 200,
      data: { contact: updatedContact },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { favorite } = req.body;

    if (favorite == null || favorite === "") {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "missing field favorite",
      });
    }

    const updatedContact = await updateContact(req.params.contactId, {
      favorite,
    });
    res.status(200).json({
      status: "success",
      code: 200,
      data: { contact: updatedContact },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  checkID,
  updateStatus,
  get,
  getById,
  create,
  update,
  remove,
};
