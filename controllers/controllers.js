import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  listFavoriteContacts,
} from "../models/contacts.js";

export async function getAllContacts(req, res, next) {
  const { favorite } = req.query;
  if (favorite === "true" || favorite === "false") {
    const contactList = await listFavoriteContacts(favorite);

    return res.json({ contactList });
  }
  const contactList = await listContacts();
  return res.status(200).json({ contactList, favorite });
}

export async function getById(req, res, next) {
  const { contactId } = req.params;
  try {
    const foundConctact = await getContactById(contactId);
    if (foundConctact) {
      res.status(200).json({ foundConctact });
    } else {
      res.status(404).json({ messgage: `Not found contact id : ${contactId}` });
    }
  } catch (error) {
    console.log(error.messgage);
    next(error);
  }
}
export async function deleteById(req, res, next) {
  const { contactId } = req.params;
  try {
    const deletedContact = await removeContact(contactId);
    if (deletedContact) {
      res.status(200).json({ message: "Deletion Successful" });
    } else {
      res
        .status(404)
        .json({ message: `No Contact Found with Id :${contactId}` });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
export async function createContact(req, res, next) {
  try {
    const result = await addContact(req.body);
    res.status(201).json({ result });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

export async function updateById(req, res, next) {
  const { contactId } = req.params;
  try {
    const result = await updateContact(contactId, req.body);
    if (result) {
      res.status(200).json({ messgage: "contact updated", result });
    } else {
      res
        .status(404)
        .json({ message: `No Contact Found with Id :${contactId}` });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
export async function updateFavorite(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (typeof favorite === "undefined") {
    return res.status(400).json({ message: "missing field favorite" });
  }
  try {
    const result = await updateContact(contactId, { favorite });
    if (result) {
      res.status(200).json({ messgage: "favortie status updated", result });
    } else {
      res.status(404).json({ message: "not Found" });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
export const filtrContacts = async (req, res, next) => {};
