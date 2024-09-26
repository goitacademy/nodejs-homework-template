const methods = require("../service/index");

const HttpError = require("../Helpers/HttpError");

const { addSchema, SchemaForUpdate } = require("../service/schemas/contact");

const get = async (req, res, next) => {
  try {
    const result = await methods.getAllContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await methods.findById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found user");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;

    const { error } = addSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const result = await methods.addNewContact({
      name,
      email,
      phone,
      favorite,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await methods.removeContact(contactId);
    if (!contact) {
      throw new HttpError(404, "Not found user");
    }

    console.log(res);
    res.status(200).send({ message: "contact deleted" }).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;

    const contact = await methods.updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });

    if (!contact) {
      throw new HttpError(404, "Not found user");
    }

    const { error } = addSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    console.log(req.body);
    const contact = await methods.updateStatusContact(contactId, {
      favorite,
    });

    if (!contact) {
      throw new HttpError(400, "Not found user");
    }

    const { error } = SchemaForUpdate.validate(req.body);
    if (error) {
      throw new HttpError(400, "missing field favorite");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  findById,
  addNewContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
