const AppError = require("../utils/appError");
const Contact = require("../service/shemas/contact");
const schema = require("../utils/contactsValidator");

const checkId = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactsList = await Contact.find();

    const contact = contactsList.find((contact) => contact.id === contactId);

    if (!contact) return next(new AppError(404, "Not found"));

    next();
  } catch (error) {
    next(error);
  }
};

const checkContactData = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return next(new AppError(400, "missing required name field"));
    }

    const { error } = schema(req.body);

    if (error) return next(new AppError(400, error.details[0].message));

    next();
  } catch (error) {
    next(error);
  }
};
const checkContactFildFavorite = async (req, res, next) => {
  try {
    const { favorite } = req.body;

    if (favorite === undefined) {
      return next(new AppError(400, "missing field favorite"));
    }
    next();
  } catch (error) {
    next(error);
  }
};

// const checkUpdateContactData = async (req, res, next) => {
//   try {
//     const { name, email, phone, favorite } = req.body;

//     if (!name && !email && !phone && !favorite) {
//       return next(new AppError(400, "missing fields"));
//     }

//     const contactsList = await Contact.find().select(["-__v", "-favorite"]);

//     const idx = contactsList.findIndex(
//       (contact) => contact.id === req.params.contactId
//     );

//     const changedContact = contactsList[idx];

//     if (name) changedContact.name = name;
//     if (email) changedContact.email = email;
//     if (phone) changedContact.phone = phone;

//     const { error } = schema(changedContact);
//     console.log(changedContact);
//     console.log(error);

//     if (error) return next(new AppError(400, error.details[0].message));

//     return next();
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  checkId,
  checkContactData,
  checkContactFildFavorite,
};
