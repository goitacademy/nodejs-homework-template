const Contacts = require("../../models/contactsSchema");
const validate = require("../../validator/ownValidate")
const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
  
    try {
      validate(req.body);
    } catch (e) {
      return next(e);
    }
  
    console.log("contactId", contactId);
  
    const record = await Contacts.updateOne({ _id: contactId }, req.body, {
      new: true,
    });
    console.log("record", record);
  
    res.json(record);
  };
  module.exports=updateContact;