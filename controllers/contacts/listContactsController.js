import repositoryContacts from "../../repository";

const listContactsController = async (req, res, next) => {
  try {
    const contacts = await repositoryContacts.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

export default listContactsController;
