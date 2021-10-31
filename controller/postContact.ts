import {Request, Response, NextFunction} from 'express';
const {Contact} = require('../model/contactSchema');

const postContact = async (req : Request, res : Response, next : NextFunction) => {
  const newContact = new Contact({...req.body});

  newContact.save();

  res.status(201).json({message: 'Contact added', data: {newContact}});
};

export = postContact;
