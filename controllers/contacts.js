const HttpError = require("../helpers/HttpError");
const { Contact } = require("../models/contact");

const getContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const { page = 1, limit = 20, favorite = true } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner, favorite })
      .skip(skip)
      .limit(limit)
      .sort(favorite);
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findById(contactId, owner);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findByIdAndRemove(contactId, owner);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "success",
      message: "contact deleted",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findByIdAndUpdate(
      { contactId, owner },
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findByIdAndUpdate(
      { contactId, owner },
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
