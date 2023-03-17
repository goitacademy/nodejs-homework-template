const Contact = require("../models/contactModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

async function getContacts(req, res, next) {
  try {
    const data = await Contact.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
}

const getContactById = asyncErrorHandler(async (req, res, next) => {
  const data = await Contact.findById(req.params.contactId);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// async function getContactById(req, res, next) {
//   try {
//     const data = await Contact.findById(req.params.contactId);
//     if (data) {
//       res.status(200).json(data);
//     } else {
//       res.status(404).json({ message: "Not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     next(error);
//   }
// }

async function removeContact(req, res, next) {
  try {
    const data = await Contact.findByIdAndDelete({ _id: req.params.contactId });
    if (data) {
      res.status(200).json({ message: "The contact was deleted successfully" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
    next(error);
  }
}

async function addContact(req, res, next) {
  const contact = new Contact(req.body);
  try {
    const data = await contact.save();
    if (!data) {
      return res.status(500).send("Write error");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const data = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true }
    );
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
}

async function toggleFavoriteContact(req, res, next) {
  try {
    const contact = await Contact.findById(req.params.contactId);
    const data = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      { favorite: !contact.favorite },
      { new: true }
    );
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send(error);
    next(error);
  }
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  toggleFavoriteContact,
};
