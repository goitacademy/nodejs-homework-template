const { NotFound } = require("http-errors");
const  { Contact }  = require("../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const contactsQuery = { owner };

   
    if (favorite === 'true') {
      contactsQuery.favorite = true;
    }

    const result = await Contact.find(contactsQuery)
      .skip(skip)
      .limit(limit);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      throw new NotFound(`Not found`);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      throw new NotFound(`Not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw new NotFound("Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw new NotFound("Not found");
    }

    res.json(result);
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