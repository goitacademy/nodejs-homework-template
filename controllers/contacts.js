const { ctrlWrapper } = require("../helpers"); // імпортуємо помилку для прокидування

const { contactServices } = require("../services");


// ************ витягуємо усі контакти ************
const getAll = (async (req, res) => {

  // const users = await User.find().select('+password');
  // const users = await User.find().select('-email');
  // const users = await User.find().select('name year');
  // const users = await User.find();

   const contacts = await contactServices.getAllContacts(req.user, req.query);

   res.status(200).json({
     msg: "Success!",
     contacts,
   });

});

// ************ витягуємо контакт по id ************
const getById = (async (req, res) => {
  const contact = await contactServices.getOneContact(req.params.contactId);

  res.status(200).json({
     msg: "Success!",
     contact,
 });

});

// ************ добавляємо контакт ************
const add = async (req, res, next) => {
  const newContact = await contactServices.createContact(req.body, req.user);

   res.status(201).json({
     msg: "Success!",
     user: newContact,
   });

};

// ************ поновити контакт по id ************
const updateById = (async (req, res) => {
  // const updatedContact = await Contact.findByIdAndUpdate(id, { name, year, role }, { new: true });
  const updatedContact = await contactServices.updateContact(req.params.contactId, req.body);

  res.status(200).json({
    msg: "Success!",
    contact: updatedContact,
  });
});

// ************ видалити контакт по id ************
const deleteById = (async (req, res) => {
  await contactServices.deleteContact(req.params.contactId);

   res.sendStatus(204);
});

// зміна значення поля favorite з true на false і навпаки
const updateStatusContact = async (req, res) => {
  const updatedContact = await contactServices.updateStatus(req.params.contactId);
  
  res.status(200).json({
    msg: "Success!",
    contact: updatedContact,
  })
};  


module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
