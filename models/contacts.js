const { Contact } = require("../db/contactModel");
const listContacts = async (req, res) => {
  try {
    const data = await Contact.find();

    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const dataId = await Contact.findById(contactId);

  if (!dataId) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(dataId);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  if (contactId) {
    await Contact.findByIdAndRemove(contactId);
    res.status(200).send({ message: "contact deleted" });
  } else {
    res.status(404).send({ message: "Not found" });
  }
};

const addContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res.status(201).send({ message: "Add contact" });
  } catch (error) {
    res
      .status(400)
      .json({ message: `missing required ${error.message} field` });
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  } else if (req.body) {
    const { name, phone, email, favorite } = req.body;
    await Contact.findByIdAndUpdate(contactId, {
      name,
      phone,
      email,
      favorite,
    });
    res.status(200).send({ message: "contact update" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateStatusContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    if (!req.body) {
      res.status(400).json({ message: "missing field favorite" });
    } else {
      const { name, email, phone, favorite } = req.body;
      console.log(Contact);
      await Contact.findByIdAndUpdate(contactId, {
        name,
        email,
        phone,
        favorite,
      });
      res.status(200).send({ message: "contact update" });
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
