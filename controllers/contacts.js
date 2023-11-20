 03-mongodb
const Contact = require('../models/contacts')
const createError = require("http-errors");

async function listContacts(req, res, next) { 
    try {
        const contact = await Contact.find().exec();

        res.json({
            status: "success",
            code: 200,
            data: {
                contact,
            }
        })
    } catch(err) {
        next(err)
  }
};

async function getContactById(req, res, next) {
    const {  contactId } = req.params;
    try {
        const contact = await Contact.findById( contactId).exec();

          if (!contact) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {

        result,

      },
    });
  } catch (error) {
    next(error);
  }
};


async function removeContact (req, res, next) {
    const { contactId } = req.params;

    try {
     const result =   await Contact.findByIdAndRemove(contactId)
        
        if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
      res.status(200).json({
        result,
      });
 res.send({contactId})
  } catch (error) {
    next(error);
  }
}   

async function addContact(req, res, next) {
    const contact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favorite: req.body.favorite
    }
    try {
        const result = await Contact.create(contact)
        console.log(result)
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result,
            },
        }); res.send(result);
    } catch (error) {
        next(error);
    }
};

async function updateContact(req, res, next) {
    const { contactId } = req.params; 
    const contact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favorite: req.body.favorite
    }
    try {
        const result = Contact.findByIdAndUpdate(contactId, contact)
        res.json({
            status: "success",
            code: 201,
            data: {
                result,
            },
        }); res.send(result)
    } catch (error) {
        next(error);
    }
}

async function updateFavorite(req, res, hext) {
    const { contactId } = req.params;
    try {
        if (!req.body) throw createError(400, `missing field favorite`);
        const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
        if (!result) throw createError(404, `404, "Not found"`);
        res.status(201).json(result);
        res.send(result)
    } catch (error) {
      next(error);
    }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
}
