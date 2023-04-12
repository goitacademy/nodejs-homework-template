const contact = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const result = await contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
