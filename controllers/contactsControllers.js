const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
  getContactByFavorite,
} = require("../servises/contactsService");

const {
  noDataByIdError,
  missingFieldFavorite,
  noDataError,
} = require("../helpers/errorHandlers");
const { successResult, successAddData } = require("../helpers/successResult");

const ctrlGetContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;

  try {
    const result = await getContacts(_id, page, limit);

    if (favorite === "false") {
      const filtredResult = result.filter((elem) => elem.favorite === false);

      successResult(res, 200, "list of contacts", filtredResult);

      return;
    }

    if (favorite === "true") {
      const filtredResult = result.filter((elem) => elem.favorite === true);

      successResult(res, 200, "list of contacts", filtredResult);

      return;
    }

    if (!result.length) {
      return res.status(404).json({
        message: "no data found",
        code: 404,
      });
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
  const { _id } = req.user;
  const { name, email, phone, favorite = false } = req.body;

  try {
    const newContact = {
      name,
      email,
      phone,
      favorite,
    };

    await addContact(newContact, _id);

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
