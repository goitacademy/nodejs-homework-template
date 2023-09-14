const HttpError = require("../helpers/httpError");

const Contact = require("../models/contactSchema");
const {
  addContactValid,
  contactChangeSchema,
  updateFavoriteSchema,
} = require("../utils/contactValidation");

const GetAll = async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const GetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Contact.findById({ id });
    if (!data) {
      throw HttpError(404, "Such contact not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const AddContact = async (req, res, next) => {
  try {
    const { error } = addContactValid.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "there is a missing field",
      });
    }

    const data = await Contact.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const RemoveContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    res = await Contact.findByIdAndRemove(id);
    if (!data) {
      throw HttpError(404, "Such contact not found");
    }

    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
};

const UpdateById = async (req, res, next) => {
  try {
    const { error } = contactChangeSchema.validate(req.body);
    const contactId = req.params.contactId;

    if (error) {
      throw HttpError(404, "Missing fields");
    }

    const updatedContactById = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updatedContactById) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    res.status(200).json(updatedContactById);
  } catch (error) {
    next(error);
  }
};

const UpdateFavoriteById = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    const contactId = req.params.contactId;

    if (error) {
      throw HttpError(404, "Missing field favorite");
    }

    const updatedContactById = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updatedContactById) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    res.status(200).json(updatedContactById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetAll,
  GetById,
  AddContact,
  RemoveContact,
  UpdateById,
  UpdateFavoriteById,
};
