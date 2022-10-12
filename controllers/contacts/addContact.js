const {Contact} = require('../../models/contact');

const addContact = async (req, res) => {
   const {_id} = req.user;
   const {body} = req;
   const newContact = await Contact.create({...body, owner: _id});
   res.status(201).json(newContact);
   };

   module.exports = addContact;