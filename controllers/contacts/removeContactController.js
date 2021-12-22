import model from "../../model/contacts";

const removeContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await model.removeContact(id);
  if (contact) {
    return res.status(200).json({ contact });
  }
  res.status(404).json({ message: "Not found" });
};

export default removeContactController;
