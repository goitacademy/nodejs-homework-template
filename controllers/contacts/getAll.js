import Contact from '../../models/Contact.js';
import { ctrlWrapper } from '../../decorators/index.js';

const getAll = ctrlWrapper(async (_, res) => {
  const result = await Contact.find({});
  res.json(result);
});

export default getAll;
