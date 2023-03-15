// const Contacts = require("../../models/contactsSchema");
const validate = require("../../validator/ownValidate");
const updateContactServices = require("../../services/contactServices/updateContactServices");
const{putContactsValidationJoi}=require('../../middlewares/validator')

const updateContact = async (req, res, next) => {
  const { contactId} = req.params;

  const body = req.body;
  try {
     putContactsValidationJoi(req.body)
    //  validate(req.body);
    const record = await updateContactServices(contactId, body);
    return res.json({
      status: "success",
      code: 201,
      message: "Contact updated successfully",
      data: { contacts:record },
    });
     
  } catch (e) {
    return next(e);
  }

};
module.exports = updateContact;
