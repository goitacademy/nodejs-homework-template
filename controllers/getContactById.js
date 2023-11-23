
import * as contactsModel from '../models/contactModel.js';


const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsModel.getContactById(id, res);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default getContactById;