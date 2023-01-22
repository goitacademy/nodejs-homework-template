const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../servises/contactsService");

const {
  noDataByIdError,
  missingFieldFavorite,
  noDataError,
} = require("../helpers/errorHandlers");
const { successResult, successAddData } = require("../helpers/successResult");

const ctrlGetContacts = async (req, res, next) => {
  try {
    const result = await getContacts();

    if (!result.length) {
      noDataError(res);
    }

    successResult(res, 200, "list of contacts", result);
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
        message: "contact",
        code: 200,
        data: result,
      });
    }

    noDataByIdError(res);
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
    successAddData(res, 201, "contact created");
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
      return res.json({
        message: "contact updated",
        code: 200,
        data: result,
      });
    }

    noDataByIdError(res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlUpdateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    if (favorite === undefined) {
      missingFieldFavorite(res);
    }

    const result = await updateContactStatus(contactId, { favorite });

    if (result) {
      return res.json({
        message: "status updated",
        code: 200,
        data: result,
      });
    }

    noDataByIdError(res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlRemoveContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (result) {
      return res.json({
        message: `contact by id: '${contactId}' deleted`,
        code: 200,
        data: result,
      });
    }

    noDataByIdError(res);
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
