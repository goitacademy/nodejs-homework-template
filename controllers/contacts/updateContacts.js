import { updateContact } from "#models/contacts.js";
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

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const updatedContact = await updateContact(contactId, body);
    res.status(200).json(updatedContact);
  } catch (err) {
    if (err.name === "Contact not found") {
      res.status(404).json("Contact not found");
    } else {
      res.status(400).json({ message: err.message });
    }
  }
}

export { updateContacts };
