const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

// ------------------------------------------------ G E T ------------------------------------------------------------------------------------------------------
const getContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// find({name: "Stas"}) - верне тільки об'єкт з ім'ям Стас і пустий масив якщо не знайде співпадіння
// find({}, "name phone") - верне тільки поля name i phone
// find({}, "-name -phone") - - верне всі поля, крім полів name i phone
// ------------------------------------------  G E T  ------------------------------------------------------------------------------------------------------

const getById = async (req, res) => {
    const { contactId } = req.params;
    //   є ще метод findOne({_id:contactId}) ---  вертає null, якщо нема співпадіння по id
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};
// ---------------------------------------------P O S T ------------------------------------------------------------------------------------------------------

const createNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.json(result);
};
// ------------------------------------------------ P U T -------------------------------------------------------------------------------------------

const changeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Book with ${contactId} not found`);
  }
  res.json(result);
};


// const updateBookById = async (req, res) => {
//     const { id } = req.params;
//     const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
//     if (!result) {
//         throw HttpError(404, `Book with ${id} not found`);
//     }
//     res.json(result);
// }
// -------------------------------------------- P A T C H ------------------------------------------------------------------------------------

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    console.log(result)
    if (!result) {
        throw HttpError(404, `Book with ${contactId} not found`);
    }
    res.json(result);
};


// ------------------------------D E L E T E ------------------------------------------------------------------------------------------------------

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  res.json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getById: ctrlWrapper(getById),
  createNewContact: ctrlWrapper(createNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  changeContact: ctrlWrapper(changeContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
