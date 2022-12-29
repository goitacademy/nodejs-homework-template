const Contacts = require("../../models/contact");

const postContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = Contacts.create({ ...req.body, owner});

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
