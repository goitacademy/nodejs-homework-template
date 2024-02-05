// controllers/contacts/updateFavoriteStatus.js
import { updateFavoriteStatus } from '../../models/contacts/contacts.js';

export const updateFavoriteStatusController = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    console.log("Contact ID:", contactId);
    const result = await updateFavoriteStatus(String(contactId), body);

    if (result.status === 200) {
      return res.status(200).json(result.contact);
    } else if (result.status === 400) {
      return res.status(400).json({ message: 'missing field favorite' });
    } else {
      return res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};