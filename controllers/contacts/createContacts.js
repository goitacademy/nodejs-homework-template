// Kontroler do obsługi tworzenia nowego kontaktu
import { addContact } from "#models/contacts.js";
import User from "#models/users.js";

const autehnticateUser = async (req, res, next) => {
try {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded._id, token });
  if (!user) {
    throw new Error();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
}

async function createContacts(req, res, next) {
  const { body } = req;

  try {
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { createContacts };
