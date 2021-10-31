import {Request, Response, NextFunction} from 'express';
const {Contact} = require('../model/contactSchema');

const getContactById = async (req : Request, res : Response, next : NextFunction) => {
  const {contactId} = req.params;

  const contact = await Contact.findById(contactId);

  res.status(200).json({message: 'success', data: {contact}});
};

export = getContactById;
