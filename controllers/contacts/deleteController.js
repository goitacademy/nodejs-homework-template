import model from "../../models/contacts/index";

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.removeContact(id);
  if (contact) {
    return res.status(200).json({ message: "contact deleted" });
  }

  res.status(404).json({ message: "Not found" });
};
