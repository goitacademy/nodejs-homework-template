const {
  updateContact
} = require("../models/contacts");
const { contactValidate } = require('../utils/contactValidator')

exports.putContact = async (req, res) => {
    const { error, value } = contactValidate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field"
    });
  }
  const contactId = req.params.contactId
  try {
    const updated = await updateContact(contactId, value)
    res.json({
      code: 200,
      data: {
        updated
      }
    })
  }  catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  }
}