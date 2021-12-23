import model from "../../model/contacts";

const addContactController = async (req, res) => {
  try {
    const newContact = await model.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
  }
};

export default addContactController;
