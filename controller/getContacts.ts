import {Request, Response, NextFunction} from 'express';
const {Contact} = require('../model/contactSchema');

const getContacts = async (req : Request, res : Response, next : NextFunction) => {
  const contacts = await Contact.find();

  res.status(200).json({message: 'success', data: {contacts}});
};

export = getContacts;
