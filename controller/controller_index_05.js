const service = require("../service");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const editSchema = Joi.object({
  name: Joi.string().pattern(/^[A-Za-z\s]+$/),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).unknown(false);

const editFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const get = async (req, res, next) => {
  try {
    const contactsList = await service.getAllContacts();
    res.status(200).json({ message: "Success", data: contactsList });
  } catch (error) {
    console.error(error);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contactById = await service.getContactById(contactId);
    if (contactById) {
      res
        .status(200)
        .json({ message: "Success", data: { contact: contactById } });
    } else {
      res.status(404).json({ message: "Not found", data: "Not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const isContactRemoved = await service.removeContact(contactId);

    if (isContactRemoved) {
      res
        .status(200)
        .json({ message: `Contact with id: ${contactId} deleted` });
    } else {
      res.status(404).json({ message: "Not found", data: "Not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const create = async (req, res, next) => {
  const body = req.body;
  try {
    const validationResult = addSchema.validate(body);

    if (validationResult.error) {
      res.status(400).send({ message: "All fields must be completed!" });
    } else {
      const newContact = await service.createContact(body);
      res
        .status(201)
        .json({ message: "Contact added", data: { contact: newContact } });
    }
  } catch (error) {
    console.error(error);
  }
};

const update = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  const validationResult = editSchema.validate(body);

  if (validationResult.error) {
    res.status(400).json({ message: "Missing fields" });
  }

  try {
    const updatedContact = await service.updateContact(contactId, body);

    if (updatedContact) {
      res
        .status(200)
        .json({ message: "Contact edited", data: { updatedContact } });
    } else {
      res
        .status(404)
        .json({ message: `Contact with id: ${contactId} not found` });
    }
  } catch (error) {
    console.error(error);
  }
};

const favorite = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  const validationResult = editFavoriteSchema.validate(body);

  if (validationResult.error) {
    res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const updatedContactStatus = await service.updateStatusContact(
      contactId,
      body
    );

    if (updatedContactStatus) {
      res
        .status(200)
        .json({ message: "Contact edited", data: { updatedContactStatus } });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
  favorite,
};
