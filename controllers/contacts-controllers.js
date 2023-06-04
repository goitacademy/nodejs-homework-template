const Contact = require("../models/contacts-model");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

// const getAllContacts = async (req, res) => {
//   console.log(Contact.collection.collectionName);
//   const result = await Contact.find();
//   console.log(result);
//   res.json(result);
// };

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  getAllContacts,
};

//   getAllContacts: ctrlWrapper(getAllContacts),
