const {
    HttpError,
    requestError,
    validateData,
    addRequestError,
  } = require("../utils");
  
  const {
    getAllContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
  } = require("../service");
  
  const get = async (_, res, next) => {
    try {
      const contacts = await getAllContacts();
      res.json(contacts);
    } catch (e) {
      next(e);
    }
  };
  
  const getOne = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      console.log("getOne");
      const contact = await getContactById(contactId);
      if (!contact) {
        throw HttpError(404, "Not found");
      }
      res.json(contact);
    } catch (e) {
      next(e);
    }
  };
  
  const add = async (res, req, next) => {
    try {
      const body = req.req.body;
      const { error } = validateData.validateBody(body);
      if (error) {
        addRequestError(res, error);
        return;
      }
      const contact = await addContact(body);
      res.res.status(201).json(contact);
    } catch (e) {
      next();
    }
  };
  
  const remove = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await removeContact(contactId);
      if (!contact) {
        throw HttpError(404, "Not found");
      }
      res.json({
        message: "contact deleted",
      });
    } catch (e) {
      next(e);
    }
  };
  
  const update = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const body = req.body;
  
      const { error } = validateData.validateUpdatedFields(body, res);
  
      if (error) {
        requestError(res, error);
      }
  
      const contact = await updateContact(contactId, body);
  
      if (!contact) {
        throw HttpError(404, "Not found");
      }
      res.json(contact);
    } catch (e) {
      next(e);
    }
  };
  
  const updateStatus = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const body = req.body;
  
      const { error } = validateData.validateStatusBody(body);
  
      if (error) {
        requestError(res, error);
        return;
      }
  
      const contact = await updateStatusContact(contactId, body);
      if (!contact) {
        throw HttpError(404, "Not found");
      }
      res.json(contact);
    } catch (e) {
      next(e);
    }
  };
  
  module.exports = {
    get,
    getOne,
    add,
    remove,
    update,
    updateStatus,
  };