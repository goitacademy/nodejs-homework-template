import {Request, Response, NextFunction} from 'express';
import {Contact} from '../model';

const updateStatusContact = async (req : Request, res : Response, next : NextFunction) => {
  const {contactId} = req.params;
  const {favorite} = req.body;

  await Contact.findByIdAndUpdate(contactId, {favorite});

  const updatedContact = await Contact.findById(contactId);

  res.status(200).json({
    message: `Contact's status updated`,
    data: {updatedContact},
  });
};

export = updateStatusContact;
