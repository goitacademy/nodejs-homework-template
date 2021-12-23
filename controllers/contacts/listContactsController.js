import model from "../../model/contacts";

const listContactsController = async (res) => {
  try {
    const contacts = await model.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

export default listContactsController;
