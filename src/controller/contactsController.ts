import { Request, Response } from "express";
import { contactService } from "../services";

const getContacts = async (_: Request, res: Response) => {
  const contacts = await contactService.getContacts();

  res.status(200).json({ message: "success", data: { contacts } });
};

const getContactById = async (req: Request, res: Response) => {
  const contact = await contactService.getContactById(req.params.contactId);

  res.status(200).json({ message: "success", data: { contact } });
};

const postContact = async (req: Request, res: Response) => {
  const newContact = await contactService.postContact({ ...req.body });

  res.status(201).json({ message: "Contact added", data: { newContact } });
};

const updateContact = async (req: Request, res: Response) => {
  const newContact = await contactService.updateContact(req.params.contactId, {
    ...req.body,
  });

  res.status(200).json({ message: "Contact updated", data: { newContact } });
};

const updateStatusContact = async (req: Request, res: Response) => {
  const updatedContact = await contactService.updateStatusContact(
    req.params.contactId,
    req.body.favorite
  );

  res
    .status(200)
    .json({ message: `Contact's status updated`, data: { updatedContact } });
};

const deleteContact = async (req: Request, res: Response) => {
  const contact = await contactService.deleteContact(req.params.contactId);

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
