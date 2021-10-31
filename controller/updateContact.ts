import {Request, Response, NextFunction} from 'express';
const {Contact} = require('../model/contactSchema');

const updateContact = async (req : Request, res : Response, next : NextFunction) => {
  const {contactId} = req.params;

  await Contact.findByIdAndUpdate(contactId, {$set: {...req.body}});

  const newContact = await Contact.findById(contactId);

  res.status(200).json({message: 'Contact updated', data: {newContact}});
};

export = updateContact;
