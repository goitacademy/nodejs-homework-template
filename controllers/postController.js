const {
    addContact
} = require("../models/contacts");
const { v4: uuidv4 } = require('uuid');
const { contactValidate } = require('../utils/contactValidator')

exports.addContact = async (req, res) => {
  const { error, value } = contactValidate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field"
    });
  }

  value.id = uuidv4();
  try {
    const newContact = await addContact(value);
    
    
    res.json({
      code: 201,
      data: {
        newContact
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    });
  }  
}