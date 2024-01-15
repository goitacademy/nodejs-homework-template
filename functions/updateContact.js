import { updateContact } from '../models/contacts.js';

export async function updateContacts(req, res) {
  const { contactId } = req.params;
  try {
    const body = req.body;
    const result = await updateContact(contactId, body);
    const { errorType, errorMessage, updatedContact } = result;
    if (errorType === 404) {
      res.status(404).json(`Message: ${errorMessage}`);
      return;
    } else if (errorType === 400) {
      res.status(400).json(`Message: ${errorMessage}`);
      return;
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    return err;
  }
}