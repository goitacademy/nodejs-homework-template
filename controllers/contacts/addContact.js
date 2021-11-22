/* eslint-disable quotes */
/* eslint-disable semi */
const contactsOperations = require("../../model");

const addContact = async (req, res, next) => {
  try {
    const addContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: addContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
