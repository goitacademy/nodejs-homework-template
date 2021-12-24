import repositoryContacts from "../../repository";

const addContactController = async (req, res, next) => {
  try {
    const newContact = await repositoryContacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
  }
};

export default addContactController;
