const { addContact } = require("../models/contacts");

const add = async (req, res, next) => {
  try {
    const result = await addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
};

module.exports = add;
