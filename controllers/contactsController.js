const { Contact } = require("../models/contactModel");

const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../validations/contact");

const updateStatusContact = async (contactId, body) => {
  const contactDetail = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: body,
    },
    { new: true }
  );
  return contactDetail;
};

const getContactsList = async (req, res, next) => {
  try {
    const contactsList = await Contact.find({});

    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { value, error } = addContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error?.details[0].message });
  }

  try {
    const newContact = new Contact(value);
    await newContact.save();

    res.status(201).json({ message: "New contact saved success", newContact });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const { value, error } = updateContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error?.details[0].message });
  }

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `Contact id ${contactId} Not found` });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: value,
      },
      { new: true }
    );

    return res.status(200).json({
      message: `Success. Contact id:${contactId} updated`,
      changes: value,
      updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { value, error } = updateStatusSchema.validate(req.body);

  if (error?.message) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, value);

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
    // next(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `Contact id ${contactId} Not found` });
    }

    await Contact.findByIdAndDelete(contactId);

    res
      .status(200)
      .json({ message: `Success. Contact ${contact._id} deleted ` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
};
