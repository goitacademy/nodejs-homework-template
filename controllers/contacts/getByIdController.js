import getById from '../../models/contacts/getById';

const getByIdController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getById(id);
  if (contact) {
    return res.status(200).json(contact);
  };
  res.status(404).json({ message: 'not found' });
}

export default getByIdController;