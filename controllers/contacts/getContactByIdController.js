import repositoryContacts from "../../repository";

const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.getContactById(id);
  console.log(contact);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
};

export default getContactByIdController;
