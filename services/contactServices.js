const { Types } = require("mongoose");
const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");


// створення нового контакта
exports.createContact = async (userData) => {
  const newContact = await Contact.create(userData);

  newContact.password = undefined;

  return newContact;
};

// отримання усіх контактів
exports.getAllContacts = () => Contact.find().select("+password"); // .lean() - щоб поубирати лишні прототипи

// отримання одного контакту
exports.getOneContact = (id) => Contact.findById(id);

// поновлення контакта по id
exports.updateContact = async (id, contactData) => {
  const contact = await Contact.findById(id);

  Object.keys(contactData).forEach((key) => {
    contact[key] = contactData[key];
  });

  return contact.save();
};

// меняє логічне значенния поля favorite на протилежне (true false)
exports.updateStatus = async (id) => {
    const contact = await Contact.findById(id);
 
    contact.favorite = !contact.favorite;
    return contact.save();
}

// видаляє контакт по id
exports.deleteContact = (id) => Contact.findByIdAndDelete(id);

// перевіряє чи є такий контакт. Якщо є, то видає помилку, що такий є
exports.checkContactExists = async (filter) => {     // filter - параметр, по якому потрібно перевіряти чи є такий контакт
  const contactExists = await Contact.exists(filter);

  if (contactExists) throw new HttpError(409, "Contact exists");
};

// перевіряємо, чи є контакт з таким id
exports.checkContactExistsById = async (id) => {
  const idIsValid = Types.ObjectId.isValid(id);  // чи валідний id

  if (!idIsValid) throw new HttpError(404, "Contact not found.."); 

//   const contactExists = await Contact.exists({ _id: id });
  const contactExists = await Contact.findById(id);

  if (!contactExists) throw new HttpError(404, "Contact not found..");
};
