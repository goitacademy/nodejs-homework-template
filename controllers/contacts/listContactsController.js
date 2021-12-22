import model from "../../model/contacts";

const listContactsController = async (res) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
};

export default listContactsController;
