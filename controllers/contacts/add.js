const contactsOperations = require("../../models/contacts");


const add = async (req, res) => {

    const result = await contactsOperations.addContact(req.body);

  res.status(201).json(result);
  } 

module.exports = add;