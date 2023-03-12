const contactsModel = require('../../models/contact')

const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    console.log(name, email, phone);
    const id =  await contactsModel.addContact(name, email, phone);
    console.log(id);
    res.status(201).json(await contactsModel.getContactById(id));
  };

  module.exports = {createContact};