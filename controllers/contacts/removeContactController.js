import repositoryContacts from "../../repository";

const removeContactController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.removeContact(id);
  if (contact) {
    return res.status(200).json({ contact });
  }
  res.status(404).json({ message: "Not found" });
};

export default removeContactController;
