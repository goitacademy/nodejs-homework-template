const { HttpError } = require("../helpers");

const {
   addContact, 
   listContacts, 
   getContactById, 
   removeContact, 
   updateContact, 
   updateFavorite, 
} = require("../models/contacts");

const getContactCtrl = async (req, res, next) => {
    try {
      const {_id: owner} = req.user;
      const {page = 1, limit = 20, favorite} = req.query;
      const skip = (page - 1) * limit;
      const result = await listContacts(owner, skip, limit, favorite);
      res.json({ 
        status: "success",
        code: 200,
        data: {result},
      })
    } catch (er) {
      next(er);
    }
}

const addContactCtrl = async (req, res, next) => {
    try {
      const {_id: owner} = req.user;
      const result = await addContact({...req.body, owner});
      res.json({ 
        status: "created",
        code: 201,
        data: {result},
      })
    } catch (er) {
      next(er);
    }
}

const getContactByIdCtrl = async (req, res, next) => {
    try {
      const {_id: owner} = req.user;
      const id = req.params.contactId;
      const result = await getContactById(id, owner);
      if (!result) {
        throw HttpError(404, "Not found")
      }
      res.json({ 
        status: "success",
        code: 200,
        data: {result},
      })
    } catch (er) {
      next(er);
    }
}

const deleteByIdCtrl = async (req, res, next) => {
    try {
      const {_id: owner} = req.user;
      const id = req.params.contactId;
      const result = await removeContact(id, owner);
      if (!result) {
        throw HttpError(404, "Not found")
      }
      res.json({ 
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {result},
      })
    } catch (er) {
      next(er);
    }
}

const updateContactCtrl = async (req, res, next) => {
    try {
      const {_id: owner} = req.user;
      const id = req.params.contactId;
      const {body} = req;
      const result = await updateContact(id, body, owner);
      if (!result) {
        throw HttpError(404, "Not found")
      }
      res.json({ 
        status: "success",
        code: 200,
        message: "contact updated",
        data: {result},
      })
    } catch (er) {
      next(er);
    }
}

const updateFavoriteCtrl = async (req, res, next) => {
    try {
      const {_id: owner} = req.user;
      const id = req.params.contactId;
      const {body} = req;
      const result = await updateFavorite(id, body, owner);
  
      if (!result) {
        throw HttpError(404, "Not found")
      }
      res.json({ 
        status: "success",
        code: 200,
        message: "contact updated",
        data: {result},
      })
    } catch (er) {
      next(er);
    }
}

module.exports = {
    addContactCtrl,
    getContactCtrl,
    getContactByIdCtrl,
    deleteByIdCtrl,
    updateContactCtrl,
    updateFavoriteCtrl,
}