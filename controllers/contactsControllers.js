
const Contact = require("../models/contacts");
const createError = require("http-errors");
const {
  addPostsValidation,
  updatePostValidation,
} = require("../middleware/validationMiddleware");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getContactByIdController  = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
   console.log('hello');
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
console.log(error);
  }
};
const deleteContactController  = async (req, res, next) => {
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

const addContactController  = async (req, res, next) => {
  try {
    const { error } = addPostsValidation.validate(req.body);
    if (error) {
      return next(createError(404, error.message));
    }
    const addContact = await Contact.create(req.body);
    res.json({
      status: "success",
      code: 201,
      data: {
        addContact,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateContactController  = async (req, res, next) => {
  // try {
  //   const { error } = updatePostValidation.validate(req.body);
  //   if (error) {
  //     return next(createError(404, error.message));
  //   }
  //   const { contactId } = req.params;
  //   const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body);
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
  getContactsController ,
  getContactByIdController ,
  deleteContactController ,
  addContactController ,
  updateContactController ,
};
