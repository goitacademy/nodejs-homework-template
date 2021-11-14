import { Request, Response } from "express";
import { contactService } from "../services";

type UpdateBodyStrings = { owner: string; favorite: boolean };

const getContacts = async (req: Request, res: Response) => {
  const ownerId: string = req.body.owner;

  const contacts = await contactService.getAll(ownerId, req);

  res.status(200).json({ message: "success", data: { contacts } });
};

const getContactById = async (req: Request, res: Response) => {
  const ownerId: string = req.body.owner;
  const contactId: string = req.params.contactId;

  const contact = await contactService.getById(ownerId, contactId);

  res.status(200).json({ message: "success", data: { contact } });
};

const postContact = async (req: Request, res: Response) => {
  const newContact = await contactService.post(req.body);

  res.status(201).json({ message: "Contact added", data: { newContact } });
};

const updateContact = async (req: Request, res: Response) => {
  const owner: string = req.body.owner;
  const contactId: string = req.params.contactId;

  const newContact = await contactService.update(owner, contactId, {
    ...req.body,
  });

  res.status(200).json({ message: "Contact updated", data: { newContact } });
};

const updateStatusContact = async (req: Request, res: Response) => {
  const { owner, favorite }: UpdateBodyStrings = req.body;
  const contactId: string = req.params.contactId;

  const updatedContact = await contactService.updateStatus(
    owner,
    contactId,
    favorite
  );

  res
    .status(200)
    .json({ message: `Contact's status updated`, data: { updatedContact } });
};

const deleteContact = async (req: Request, res: Response) => {
  const owner: string = req.body.owner;
  const contactId: string = req.params.contactId;

  const contact = await contactService.deleteById(owner, contactId);

  res.status(200).json({ message: "Contact deleted", data: { contact } });
};

export {
  getContacts,
  getContactById,
  postContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
