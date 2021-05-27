const express = require('express');
const router = express.Router();
const Contacts = require("../../model/contacts");
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateFavouriteContact,
}= require("./validation")

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
   return res.status(200).json({status:"succes", code: 200, data:{contacts}}) 
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.getById(req.params.id)
    if (contact) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" })
  } catch (error) {
    next(error);
  }
})

router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.create(req.body)
    return res
      .status(201)
      .json({ status: "succes", code: 201, data: { contact } })
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
      try {
    const contact = await Contacts.removeContact(req.params.id)
    if (contact) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { contact }, "message": "contact deleted" })
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" })
  } catch (error) {
    next(error);
  }
})

router.patch('/:id/favorites', validateUpdateFavouriteContact, async (req, res, next) => {
     try {
    const contact = await Contacts.update(req.params.id, req.body)
    if (contact) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" })
  } catch (error) {
    next(error);
  }
})

router.put('/:id', validateUpdateContact, async (req, res, next) => {
    try {
    const contact = await Contacts.update(req.params.id, req.body)
    if (contact) {
      return res
        .status(200)
        .json({ status: "succes", code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" })
  } catch (error) {
    next(error);
  }
})


module.exports = router
