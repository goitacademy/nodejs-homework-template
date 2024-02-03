import { listContacts, addContact } from "#models/contacts.js";
import User from "#models/users.js";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

async function indexContacts(req, res, next) {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
}

async function createContacts(req, res, next) {
  const { body } = req;

  try {
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export { indexContacts, createContacts };
