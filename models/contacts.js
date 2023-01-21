const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../servises/contactsService");

const ctrlGetContacts = async (req, res, next) => {
  try {
    const result = await getContacts();

    if (!result.length) {
      console.log("no contacts");
      return res.status(404).json({ message: "no contacts found", code: 404 });
    }

    res.json({ message: "list of contacts", code: 200, data: result });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlGetContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await getContactById(contactId);

    if (result) {
      return res.json({
        message: `contact by id: '${contactId}'`,
        code: 200,
        data: result,
      });
    } else {
      return res.status(404).json({
        message: `no contacts by id: '${contactId}' found`,
        code: 404,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlAddContact = async (req, res, next) => {
  const { name, email, phone, favorite = false } = req.body;

  try {
    const newContact = {
      name,
      email,
      phone,
      favorite,
    };

    await addContact(newContact);
    res.status(201).json({ message: "contact created", code: 201, newContact });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlUpdateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite = false } = req.body;

  try {
    const result = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });

    if (result) {
      console.log(`contact updated`);
      return res.json({
        message: `contact updated`,
        code: 200,
        data: result,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlUpdateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;

  try {
    if (!req.body) {
      console.log(`missing field favorite`);
      return res.json({
        message: `missing field favorite`,
        code: 400,
        data: result,
      });
    }

    const result = await updateContactStatus(contactId, { favorite });

    if (result) {
      console.log(`status updated`);
      return res.json({
        message: `status updated`,
        code: 200,
        data: result,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlRemoveContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);
    if (result) {
      res.status(200).json({
        message: `contact by id: '${contactId}' deleted`,
        code: 200,
        data: result,
      });
    } else {
      return res.status(404).json({
        message: `no contacts by id: '${contactId}' found`,
        code: 404,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  ctrlGetContacts,
  ctrlGetContactById,
  ctrlAddContact,
  ctrlUpdateContact,
  ctrlUpdateStatusContact,
  ctrlRemoveContact,
};
