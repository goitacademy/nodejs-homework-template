const {Contact} = require('../model/contactSchema');

const postContact = async (req, res, next) => {
  const newContact = new Contact({...req.body});

  newContact.save();
  
  res.status(201).json({message: 'Contact added', data: {newContact}});
};

module.exports = postContact;
