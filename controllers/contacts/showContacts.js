import { getAllContacts } from "../../service/index.js";

export async function showContacts(req, res, next) {
  try {
    const contacts = await getAllContacts();
    return res.json({
      status: "succes",
      code: 200,
      data: {
        contacts: contacts,
        contactsCount: contacts.length,
      },
    });
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
