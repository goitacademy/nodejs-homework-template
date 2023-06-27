const service = require("../service/contacts");
const { HttpError } = require("../helpers/HttpError");
const Contact = require("../service/schemas/contacts");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    }).populate("owner", "email");
    res.status(200).json({
      code: 200,
      message: "success",
      data: result,
      qty: result.length,
    });
  }

  const result = await Contact.find({ owner }, "", {
    skip,
    limit,
  }).populate("owner", "email");

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: result,
    qty: result.length,
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await service.getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const addContact = async (req, res, next) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    throw HttpError(404, "Controller: provide all required files");
  }
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  if (!newContact) {
    throw HttpError(404, "Controller: unable to save contact");
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: newContact,
  });
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const fields = req.body;
    const contact = await service.updateContact(contactId, fields);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const setFavorite = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { contactId } = req.params;
    const contact = await service.updateStatusContact(contactId, favorite);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToRemove = await service.deleteContact(contactId);
    if (!contactToRemove) {
      return res.status(404).json({ message: "Not found contact" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  updateContact,
  removeContact,
  setFavorite,
};
