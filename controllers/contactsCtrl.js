// const fs = require("fs/promises");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  removeContact,
} = require("../servises/contactsServise");

const ctrlGetContacts = async (req, res, next) => {
  try {
    const result = await getContacts();

    if (!result) {
      return res.status(404).json({ message: "no contacts", code: 404 });
    }
    res.json({ message: "list of contacts", code: 200, result });
    console.table(result);
  } catch (error) {
    next(error);
  }
};

const ctrlGetContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      return res.status(404).json({
        message: `id ${contactId} not found`,
        code: 404,
      });
    }

    res.json({
      message: `contacn by id ${contactId}`,
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const ctrlRemoveContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) {
      return res.status(404).json({
        message: `id ${contactId} not found`,
        code: 404,
      });
    }

    res.status(200).json({
      message: `contact by id ${contactId} deleted`,
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const ctrlAddContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite = false } = req.body;
    const newContact = {
      name,
      email,
      phone,
      favorite,
    };

    await addContact(newContact);

    res.status(201).json({
      message: "contact created",
      code: 201,
      newContact,
    });
  } catch (error) {
    next(error);
  }
};

const ctrlUpdateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite = false } = req.body;

    const result = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });

    if (!result) {
      console.log(`no contacts by id: '${contactId}' found`);

      return res.status(404).json({
        message: `id ${contactId} not found`,
        code: 404,
      });
    }

    res.status(200).json({
      message: `updated contact by id: '${contactId}' `,
      code: 200,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const ctrlUpdateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.json({
        message: `missing field favorite`,
        code: 400,
      });
    }

    const result = await updateContactStatus(contactId, { favorite });

    if (result) {
      return res.json({
        message: "status updated",
        code: 200,
        data: result,
      });
    }

    return res.status(404).json({
      message: `no contacts by this id found`,
      code: 404,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  ctrlGetContacts,
  ctrlGetContactById,
  ctrlRemoveContact,
  ctrlAddContact,
  ctrlUpdateContact,
  ctrlUpdateStatusContact,
};
