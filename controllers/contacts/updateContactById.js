const updateContact = require("../../model/contacts/updateContact");
const { joiContactSchema } = require("../../validation");

const updateContactById = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }
    const { contactId } = req.params;
    const update = await updateContact(contactId, req.body);
    // console.log(update);
    if (!update) {
      return res.status(400).json({
        "message": "Not found"
      })
    }
    res.json({
      update
    })
  }
  catch(error) {
    next(error)
  }
}

module.exports = updateContactById;