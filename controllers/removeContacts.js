
import * as contactsModel from '#models/contactModel.js';


const removeContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await contactsModel.removeContact(id);


    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default removeContact;
