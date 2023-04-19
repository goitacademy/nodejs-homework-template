const ObjectId = require("mongoose").Types.ObjectId;
const Contact = require("../models/contact");
const { NotFound, BadRequest } = require("http-errors");

const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner }, "", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const newContact = await Contact.create({ ...req.body, owner });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id) == false) {
      throw new NotFound("Not Found");
    }
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new NotFound("Not Found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw new NotFound("Not Found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw new BadRequest("Missing fields");
    }
    const newContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!newContact) {
      throw new NotFound("Not Found");
    }
    res.json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw new BadRequest("Missing fields");
    }
    const newContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!newContact) {
      throw new NotFound("Not Found");
    }
    res.json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
};
