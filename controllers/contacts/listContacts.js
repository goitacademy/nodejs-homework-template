const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const { Contact } = require("../models");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  console.log(result);
  if (!result) {
    res.status(400);
    throw new Error("Controller: Unnable to fetch contacts");
  }
  res.json(result);
};

module.exports = listContacts