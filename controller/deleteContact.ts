import {Request, Response, NextFunction} from 'express';
import {Contact} from '../model/contactSchema';

const deleteContact = async (req : Request, res : Response, next : NextFunction) => {
  const {contactId} = req.params;

  const contact = await Contact.findByIdAndRemove(contactId);

  res.status(200).json({message: 'Contact deleted', data: {contact}});
};

export = deleteContact;
