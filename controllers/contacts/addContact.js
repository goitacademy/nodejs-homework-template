import Contact from '../../models/Contact.js';
import { ctrlWrapper } from '../../decorators/index.js';

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

export default ctrlWrapper(addContact);
