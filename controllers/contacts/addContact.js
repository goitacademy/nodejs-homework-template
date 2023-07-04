const { Contact } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    if (!req.body || !req.body.name) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;