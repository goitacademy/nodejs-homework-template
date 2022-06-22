// const contactsOperations = require("../../contactsOperations");
const { Contact } = require("../../models");
const addContact = async (req, res, next) => {
  const { _id } = req.user;
  // const { name, email, phone } = req.body;
  try {
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
