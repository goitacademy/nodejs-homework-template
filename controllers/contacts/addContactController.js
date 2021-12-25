import repositoryContacts from "../../repository";
import { HttpCode } from "../../lib/constants";

const addContactController = async (req, res, next) => {
  try {
    const newContact = await repositoryContacts.addContact(req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { contact: newContact },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default addContactController;
