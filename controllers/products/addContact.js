const { Contact } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json({ result });
  } catch (e) {
    e.status = 400;
    next(e);
  }
};

module.exports = addContact;
