const { Contact } = require("../db/contactModel");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const owner = _id;
  const { limit } = req.query;

  try {
    let skip =
      Number(req.query?.page) * Number(req.query?.limit) -
      Number(req.query?.limit);
    if (skip < 0) skip = 0;

    const data = await Contact.find({ owner, ...req.query })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .select({ __v: 0 });

    return res.json(data);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const owner = _id;
  const dataId = await Contact.findById({ _id: contactId, owner });

  if (!dataId) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(dataId);
};

const removeContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const owner = _id;

  if (contactId && _id) {
    const dataContactId = await Contact.findByIdAndRemove({
      _id: contactId,
      owner,
    });
    if (dataContactId) {
      res.status(200).send({ message: "contact deleted" });
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } else {
    res.status(404).send({ message: "Not found" });
  }
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const owner = _id;
  try {
    const contact = new Contact({ ...req.body, owner });
    await contact.save();
    return res.status(201).send({ message: "Add contact" });
  } catch (error) {
    res
      .status(400)
      .json({ message: `missing required ${error.message} field` });
  }
};

const updateContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const owner = _id;
  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  } else if (req.body) {
    const { name, phone, email, favorite } = req.body;
    await Contact.findByIdAndUpdate(
      { _id: contactId, owner },
      {
        name,
        phone,
        email,
        favorite,
      }
    );
    res.status(200).send({ message: "contact update" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateStatusContact = async (req, res) => {
  const { _id } = req.user;
  const owner = _id;
  try {
    const { contactId } = req.params;

    if (!req.body) {
      res.status(400).json({ message: "missing field favorite" });
    } else {
      const { name, email, phone, favorite } = req.body;

      await Contact.findByIdAndUpdate(
        { _id: contactId, owner },
        {
          name,
          email,
          phone,
          favorite,
        }
      );
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
