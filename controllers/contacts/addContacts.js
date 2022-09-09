const { Contact } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const result = Contact.create({ ...req.body, owner: _id });
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
};
module.exports = addContact;
