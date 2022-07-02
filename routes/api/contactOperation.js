const {
  createError,
  postJoiSchema,
  updateJoiSchema,
  favoriteJoiSchema,
} = require("../../helpers");

const { Contact } = require("../../models/schemas");

const addContact = async (req, res, next) => {
  try {
    const { error } = postJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "Missing required name field");
    }
    const contact = await Contact.create(req.body);
    if (!contact) {
      throw createError(404);
    }
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const getAllContact = async (req, res, next) => {
  try {
    res.json(await Contact.find({}, "-createdAt -updatedAt"));
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw createError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = updateJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "Missing required name field");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = favoriteJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "Missing required name field");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
  getAllContact,
  getContactById,
  removeContact,
  updateById,
  updateFavorite,
};
