const service = require("../services/index");
const { joiContactSchema } = require("../services/schemas/joiSchema");

const getAllContacts = async (req, res, next) => {
 try {
  const allContacts = await service.listContacts();
  return res.status(200).json({
   status: "success",
   code: 200,
   data: { allContacts },
  });
 } catch (error) {
  next(error);
 }
};

const addContacts = async (req, res, next) => {
 try {
  const { name, phone, email, favorite } = req.body;
  const result = await service.addContact({
   name,
   phone,
   email,
   favorite,
  });

  res.status(201).json({
   status: "succes",
   code: 201,
   data: result,
  });
 } catch (error) {
  res.status(404).json({
   status: "error",
   code: 404,
  });
  next(error);
 }
};
const deleteContact = async (req, res, next) => {
 const { contactId } = req.params;
 try {
  const removedContact = await service.removeContact(contactId);
  if (removedContact) {
   return res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
   });
  } else {
   return res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
   });
  }
 } catch (error) {
  next(error);
 }
};

const getContactById = async (req, res, next) => {
 try {
  const { contactId } = req.params;
  const allContacts = await service.listContacts();
  if (allContacts.some((item) => item.id === contactId)) {
   const selectContact = await service.getContactById(contactId);
   return res.json({
    status: "success",
    code: 200,
    data: {
     result: selectContact,
    },
   });
  } else {
   return res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
   });
  }
 } catch (error) {
  next(error);
 }
};

const updateContact = async (req, res, next) => {
 try {
  if (Object.keys(req.body).length === 0) {
   return res.status(400).json({
    status: "error",
    code: 400,
    message: "missing fields",
   });
  }
  const { error } = joiContactSchema.validate(req.body);
  if (error) {
   return res.status(400).json({
    status: "error",
    code: 400,
    message: error.message,
   });
  }
  const { contactId } = req.params;
  const allContacts = await service.listContacts();
  if (allContacts.some((item) => item.id === contactId)) {
   const updatedContact = await service.updateContact(contactId, req.body);
   return res.json({
    status: "success",
    code: 200,
    data: {
     result: updatedContact,
    },
   });
  } else {
   return res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
   });
  }
 } catch (error) {
  next(error);
 }
};
const updateStatusContact = async (req, res, next) => {
 try {
  if (Object.keys(req.body).length === 0) {
   return res.status(400).json({
    status: "error",
    code: 400,
    message: "missing field favorite",
   });
  }
  const { error } = joiContactSchema.validate(req.body);
  if (error) {
   return res.status(400).json({
    status: "error",
    code: 400,
    message: error.message,
   });
  }
  const { contactId } = req.params;
  const allContacts = await service.listContacts();
  if (allContacts.some((item) => item.id === contactId)) {
   const updatedStatusContact = await service.updateStatusContact(contactId, {
    ...req.body,
   });
   return res.json({
    status: "success",
    code: 200,
    data: {
     result: updatedStatusContact,
    },
   });
  } else {
   return res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
   });
  }
 } catch (error) {
  next(error);
 }
};

module.exports = { updateContact, updateStatusContact, deleteContact, addContacts, getAllContacts, getContactById };
