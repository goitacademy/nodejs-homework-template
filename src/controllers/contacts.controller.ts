import { Response } from 'express';
import { responseData } from 'helpers/apiHelpers';
import {
  addContactService,
  getContactByIdService,
  getContactsService,
  removeContactByIdService,
  updateContactByIdService,
} from 'services/contacts.service';
import { NotFoundError } from 'helpers/errors';
import { IRequest } from 'types/Request.interface';
import { ContactsQueryType } from 'types/ContactsQuery.type';

const convertQueryParams = (query: ContactsQueryType) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = query.page ? limit * (page - 1) : 0;
  const favorite = query.favorite !== undefined ? query.favorite : undefined;

  return { limit, skip, page, favorite };
};

export const getContactsController = async (req: IRequest, res: Response) => {
  const query = convertQueryParams(req.query);
  const contacts = await getContactsService(req.user?._id!, query);

  res.status(200).json(responseData(contacts, 200));
};

export const getContactByIdController = async (req: IRequest, res: Response) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId, req.user?._id!);

  if (!contact) {
    throw new NotFoundError(`Contact not found`);
  }

  res.status(200).json(responseData(contact, 200));
};

export const addContactController = async (req: IRequest, res: Response) => {
  const newContact = await addContactService({ ...req.body, owner: req.user?._id });

  res.status(201).json(responseData(newContact, 201));
};

export const deleteContactByIdController = async (req: IRequest, res: Response) => {
  const { contactId } = req.params;
  const removedContact = await removeContactByIdService(contactId, req.user?._id!);

  if (!removedContact) {
    throw new NotFoundError(`Contact not found`);
  }

  res.status(200).json(responseData(removedContact, 200));
};

export const updateContactByIdController = async (req: IRequest, res: Response) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactByIdService(contactId, req.body, req.user?._id!);

  if (!updatedContact) {
    throw new NotFoundError(`Contact not found`);
  }
  res.status(200).json(responseData(updatedContact, 200));
};

export const updateFavoriteByIdController = async (req: IRequest, res: Response) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactByIdService(contactId, req.body, req.user?._id!);

  if (!updatedContact) {
    throw new NotFoundError(`Contact not found`);
  }
  res.status(200).json(responseData(updatedContact, 200));
};
