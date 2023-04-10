const { Contact } = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
  // const result = await Contact.find({}, "-createdAt -updatedAt");
  // const result = await Contact.find();
  // res.json(result);
};

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // const result = await Contact.create(req.body);
  // res.status(201).json(result);
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
  // const { contactId } = req.params;
  // const contact = await Contact.findById(contactId);
  // if (!contact) {
  //   res.status(404).json({ message: "Not found" });
  //   return;
  // }
  // res.status(200).json(contact);
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      res.status(400).json({ message: "missing fields" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
  // const { contactId } = req.params;
  // const result = await Contact.findByIdAndUpdate(contactId, req.body, {
  //   new: true,
  // });
  // if (!result) {
  //   res.status(400).json({ message: "missing fields" });
  // }
  // res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      res.status(400).json({ message: "missing field favorite" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }

  // const { contactId } = req.params;
  // const result = await Contact.findByIdAndUpdate(contactId, req.body, {
  //   new: true,
  // });
  // if (!result) {
  //   res.status(400).json({ message: "missing field favorite" });
  // }
  // res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: `contact deleted` });
  } catch (error) {
    next(error);
  }
  // const { contactId } = req.params;
  // const result = await Contact.findByIdAndDelete(contactId);
  // if (!result) {
  //   res.status(404).json({ message: "Not found" });
  // }
  // res.status(200).json({ message: `contact deleted` });
};

module.exports = {
  getAllContacts,
  updateStatusContact,
  getContactById,
  addContact,
  updateContactById,
  deleteContact,
};
