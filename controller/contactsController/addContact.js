//  const Contacts = require("../../models/contactsSchema");
//const validate = require("../../validator/ownValidate");
const addContactServices = require("../../services/contactServices/addContactServices");
const { addContactsValidationJoi } = require("../../middlewares/validator");
const userSchema = require("../../models/userSchema");
const gravatar = require('gravatar');

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    
    const result = await addContactServices(req.body, _id);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contacts: result },
    });
  } catch (e) {
    return next(e);
  }
};
module.exports = addContact;
