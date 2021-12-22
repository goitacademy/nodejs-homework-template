import model from "../../model/contacts";
// import { validateUpdate } from "../../../midllewares/validation/validation";

const updateContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await model.updateContact(id, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
};

export default updateContactController;
