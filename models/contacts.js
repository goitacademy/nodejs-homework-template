const { HttpError } = require("../helpers");
const { schemas, Contact } = require("../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const { page = 1, limit = 20 } = req.query;

    const skip = (page - 1) * limit;

    const allContacts = await Contact.find(
      { owner },
      "name email phone favorite",
      { skip, limit }
    ).populate("owner", "name email");
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      const missingFieldName = error.details[0].message;

      throw HttpError(400, missingFieldName);
    }

    const { _id: owner } = req.user;

    const contactToCreate = await Contact.create({ ...req.body, owner });
    res.status(201).json(contactToCreate);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);

    const emptyBody = Object.keys(req.body);
    if (!emptyBody.length) {
      throw HttpError(400, `missing fields`);
    }
    if (error) {
      const missingFieldName = error.details[0].message;

      throw HttpError(400, missingFieldName);
    }

    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);

    const emptyBody = Object.keys(req.body);
    if (!emptyBody.length) {
      throw HttpError(400, `missing field favorite`);
    }
    if (error) {
      const missingFieldName = error.details[0].message;

      throw HttpError(400, missingFieldName);
    }

    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToRemove = await Contact.findByIdAndRemove(id);

    if (!contactToRemove) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Contact removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
