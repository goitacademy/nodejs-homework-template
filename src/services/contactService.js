const { Contacts } = require("../db/contactsModel");

const listContacts = async (req, res, next) => {
  try {
    const data = await Contacts.find({});
    res.json({
      status: "success",
      code: 200,
      data,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const id = String(contactId);
    const results = await Contacts.findOne({ _id: id });
    if (!results) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.json({
        status: "success",
        code: 200,
        data: results,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const id = String(contactId);
    const contactById = await Contacts.findOne({ _id: id });

    if (!contactById) {
      return res.status(404).json({ message: "Not found" });
    } else {
      await Contacts.findOneAndRemove({ contactId });
      return res.status(200).json({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const isAddedBefore = await Contacts.findOne({ phone: req.body.phone });
    if (!req.body.name || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: "missing required field" });
    }
    if (isAddedBefore) {
      return res.status(400).json({
        message: `contact with phone ${req.body.phone} was added before`,
      });
    }

    const contact = await new Contacts({ ...req.body });
    await contact.save();

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const id = String(contactId);

    if (!req.body) {
      return res.status(400).json({ message: "missing fields" });
    } else {
      await Contacts.findByIdAndUpdate(
        {
          _id: id,
        },
        { ...req.body }
      );
      const updated = await Contacts.findOne({ _id: id });
      return res.status(200).json(updated);
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const id = String(contactId);

    await Contacts.findByIdAndUpdate(
      {
        _id: id,
      },
      { ...req.body }
    );
    const updated = await Contacts.findOne({ _id: id });
    return res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    next(error);
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
