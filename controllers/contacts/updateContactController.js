import updateContact from '../../models/contacts/updateContact';

const updateContactController = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await updateContact(id, req.body);
  if (updatedContact) {
    return res.status(200).json(updatedContact);
  };
  res.status(404).json({ message: 'not found' });
}

export default updateContactController