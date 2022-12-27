const Contacts = require("../../models/contact");

const postContact = async (req, res, next) => {
  try {
    const result = Contacts.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
