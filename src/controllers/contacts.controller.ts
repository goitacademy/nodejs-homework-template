import { Request, Response } from 'express';
import crypto from 'crypto';
import { responseData } from 'helpers/apiHelpers';
import {
  addContactService,
  getContactByIdService,
  getContactsService,
  removeContactByIdService,
  updateContactByIdService,
} from 'services/contacts.service';
import { WrongParametersError } from 'helpers/errors';

export const getContactsController = async (_: Request, res: Response) => {
  const contacts = await getContactsService();

  res.status(200).json(responseData({ contacts }, 200));
};

export const getContactByIdController = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);

  if (!contact) {
    throw new WrongParametersError(`Contact not found`);
  }

  res.status(200).json(responseData(contact, 200));
};

export const addContactController = async (req: Request, res: Response) => {
  const newContact = await addContactService({ id: crypto.randomUUID(), ...req.body });

  res.status(201).json(responseData(newContact, 201));
};

export const deleteContactByIdController = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const removedContact = await removeContactByIdService(contactId);

  if (!removedContact) {
    throw new WrongParametersError(`Contact not found`);
  }

  res.status(200).json(responseData(removedContact, 200));
};

export const updateContactByIdController = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactByIdService(contactId, req.body);

  if (!updatedContact) {
    throw new WrongParametersError(`Contact not found`);
  }
  res.status(200).json(responseData(updatedContact, 200));
};
