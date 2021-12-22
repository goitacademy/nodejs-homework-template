import removeContact from '../../models/contacts/removeContact';

const removeContactController = async (req, res, next) => {
  const { id } = req.params;
  const deletedContact = await removeContact(id);
  if (deletedContact) {
    res.status(200).json({ message: 'contact deleted' });
  }
  res.status(404).json({ message: 'Not found' });
}

export default removeContactController;