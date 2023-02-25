const contactsOperations = require("../models/contacts");
const {
  addPostsValidation,
  updatePostValidation,
} = require("../middleware/validationMiddleware");
const createError = require("http-errors");

const { connectMongo } = require("../db/connection");

const getContacts = async (req, res, next) => {

  try {
    const contacts = await req.db.Contacts.find({}).toArray();
    res.json({
      status: "successs",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  // try {
  //   const { contactId } = req.params;
  //   const getContact = await contactsOperations.getContactById(contactId);
  //   if (!getContact) {
  //     return next(createError(404, `Contact with id ${contactId} not found`));
  //   }
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //       result: getContact,
  //     },
  //   });
  // } catch (error) {
  //   next(error);
  // }
};
const deleteContact = async (req, res, next) => {
  // try {
  //   const { contactId } = req.params;
  //   const deletedContact = await contactsOperations.removeContact(contactId);
  //   if (!deletedContact) {
  //     return next(
  //       createError(404, `Contact with id ${contactId} can not be deleted`)
  //     );
  //   }
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     message: `Contact with id ${contactId} has been deleted`,
  //     data: {
  //       deletedContact,
  //     },
  //   });
  // } catch (error) {
  //   next(error);
  // }
};

const addContact = async (req, res, next) => {
  // try {
  //   const { error } = addPostsValidation.validate(req.body);
  //   if (error) {
  //     return next(createError(404, error.message));
  //   }
  //   const addContact = await contactsOperations.addContact(req.body);

  //   res.json({
  //     status: "success",
  //     code: 201,
  //     data: {
  //       addContact,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

const updateContact = async (req, res, next) => {
  // try {
  //   const { error } = updatePostValidation.validate(req.body);
  //   if (error) {
  //     return next(createError(404, error.message));
  //   }
  //   const { contactId } = req.params;
  //   const { name, email, phone } = req.body;
  //   const updatedContact = await contactsOperations.updateContact(contactId, {
  //     name,
  //     email,
  //     phone,
  //   });
  //   if (!updatedContact) {
  //     return next(createError(404, `Something went wrong`));
  //   }
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //       updatedContact,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};
module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
