const { Contact } = require("../models/contactModel");

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

const getContactById = async ({ params: { contactId } }, res, next) => {
  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async ({ body }, res, next) => {
  try {
    const newContact = new Contact(body);
    await newContact.save();

    res.status(201).json({ message: "New contact saved success", newContact });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const updateContact = async ({ body, params: { contactId } }, res, next) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: body,
      },
      { new: true }
    );

    if (updatedContact === null) {
      return res
        .status(404)
        .json({ message: `Contact id ${contactId} Not found` });
    }

    return res.status(200).json({
      message: `Success. Contact id:${contactId} updated`,
      changes: body,
      updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async ({ body, params: { contactId } }, res, next) => {
  try {
    const updatedContact = await updateStatusContact(contactId, body);

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};

const removeContact = async ({ params: { contactId } }, res, next) => {
  try {
    const removedContact = await Contact.findByIdAndDelete(contactId);

    if (removedContact === null) {
      return res
        .status(404)
        .json({ message: `Contact id ${contactId} Not found` });
    }
    res
      .status(200)
      .json({ message: `Success. Contact ${removedContact._id} deleted ` });
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
