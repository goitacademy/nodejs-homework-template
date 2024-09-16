const fs = require('fs/promises');
const Contact = require('../../models/contacts/contacts');


const addContact = async (req, res) => {  
  const { _id: owner } = req.user;
  try {
    const item = await Contact.create({...req.body, owner});
    return res.status(201).json({ message: 'Contact is added', item });
  }
  catch (err) {
        res.status(405).json({ message: 'Ooops...'})
    }
}

module.exports = {
  addContact
}