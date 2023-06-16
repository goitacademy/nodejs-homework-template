const {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../service/index.js");

const get = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    if (contacts.length === 0) {
      console.log("There is no contact in the contact database yet.");
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "There are no contacts in the database.",
      });
    }
    if (contacts.length > 0) {
      console.log(
        `There are ${contacts.length} contacts in the contact database`
      );
      res.status(200).json({
        status: "success",
        code: 200,
        message: `There are ${contacts.length} contacts in the database.`,
        data: {
          contacts,
        },
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      console.log(
        `Contact with id: ${contactId} was successfully found in the contact database.`
      );
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      console.log(
        `Contact with id: ${contactId} was not found in the contact database.`
      );
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  const { body } = req;
  try {
    const contact = await createContact(body);
    console.log(
      `Contact with id: ${contact.id} has been successfully added to the contact database.`
    );
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact was added to database",
      data: {
        contact,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await removeContact(contactId);
    if (contact) {
      console.log(
        `Contact with id: ${contactId} has been successfully removed from the contact database.`
      );
      res.status(200).json({
        status: "success",
        code: 200,
        message: `Contact with id: ${contactId} was removed from database.`,
        data: {
          contact,
        },
      });
    } else {
      console.log(
        `Contact with id: ${contactId} was not found in the contact database.`
      );
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const contact = await updateContact(contactId, body);
    if (contact) {
      console.log(`Contact with id: ${contactId} has been updated.`);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact updated",
        data: {
          contact,
        },
      });
    } else {
      console.log(
        `Contact with id: ${contactId} was not found in the contact database.`
      );
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const contact = await updateFavorite(contactId, favorite);
    if (contact) {
      console.log(`Contact status with id: ${contactId} has been updated.`);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact status updated",
        data: {
          contact,
        },
      });
    } else {
      console.log(
        `Contact with id: ${contactId} was not found in the contact database.`
      );
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatusContact,
};
