
import * as contactsModel from '#models/contactModel.js';


const updateContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedContact = await contactsModel.updateContact(id, req.body);

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default updateContact;
