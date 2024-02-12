import { createContact, getContactByName } from "#service/index.js";

export async function createContact(req, res, next) {
  const { name, email, phone, favorite } = req.body;
  try {
    const searchContact = await getContactByName(name);

    if (searchContact) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        data: "Not found",
        message: `Contact with name: '${name}' already exsist`,
      });
    } else {
      const newContact = await createContact({ name, email, phone, favorite });
      return res.status(201).json({
        status: "success",
        code: 201,
        data: { contact: newContact },
      });
    }
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
