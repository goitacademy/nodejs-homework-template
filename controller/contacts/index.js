const service = require("../../service/schemas/contact");
const { RequestError } = require("../../helpers");
const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../../validationSchemas/contacts");
const get = async (req, res, next) => {
  try {
    const addOwnerToQuery=Object.assign(req.query,{owner:req.user.id});
    console.log(addOwnerToQuery);
    const result = await service.getAllContacts(addOwnerToQuery);
    result?.length > 0
      ? res.json({
          code: 200,
          message: result,
        })
      : res.json({
          message: "Not found",
        });
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await service.getContactById(contactId,req.user.id);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.json({ code: 200, message: result });
  } catch (error) {
    next(error);
  }
};
const addContact = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required name field");
    }
   ;
   console.log(req.user.id);
    const { name, email, phone, favorite, _id } = await service.addContact(
      req.body,
      req.user.id
    );
    res.status(201).json({
      data: { name, email, phone, favorite, _id },
    });
  } catch (error) {
    next(error);
  }
};
const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await service.removeContact(contactId,req.user.id);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await service.updateContact(contactId,req.user.id, { ...req.body });
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
const updateFavorite = async (req, res, next) => {
  try {
    const { error } = updateStatusSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await service.updateStatusContact(contactId,req.user.id, req.body);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  get,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
