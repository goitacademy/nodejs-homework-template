import model from "../../model/contacts";

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
};

export default getContactByIdController;
