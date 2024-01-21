import { removeContact } from '../../models/contacts.js';

async function deleteContacts(req, res, next) {
  const { contactId } = req.params;

  try {
    const result = await removeContact(contactId);

    if (result) {
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    next(error);
  }
}

export { deleteContacts };





// router.delete('/api/contacts/:contactId', async (req, res, next) => {
//     const { contactId } = req.params;
//     try {
//       const result = await removeContact(contactId);
//       if (result) {
//         res.status(200).json({ message: 'Contact deleted' });
//       } else {
//         res.status(404).json({ message: 'Not found' });
//       }
//     } catch (error) {
//       next(error);
//     }
//   });