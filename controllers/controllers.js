// const HttpError = require("../helpers/HttpError");

const { Contact } = require("../models/contact");

const getContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
      // throw HttpError(404, "Not Faund");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    console.log(req.body);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    if (Object.keys(req.body).length === 0) {
      console.log("length:", Object.keys(req.body).length);

      return res.status(400).json({ message: "missing field favorite" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      // throw HttpError(404);
      console.log("error:", res.status);

      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
