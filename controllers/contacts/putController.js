import model from "../../models/contacts/index";

export const putContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.updateContact(id, req.body);
  if (contact) {
    return res.status(200).json(contact);
  }

  res.status(404).json({ message: "Not found" });
};
