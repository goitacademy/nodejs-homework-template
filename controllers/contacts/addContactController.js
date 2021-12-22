import model from "../../model/contacts";
// import { validateCreate } from "../../../midllewares/validation/validation";

const addContactController = async (req, res) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json(newContact);
};

export default addContactController;
