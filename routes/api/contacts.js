const express = require('express');

const createError = require('http-errors');
// const Joi = require('joi');
const router = express.Router()

const { Contact } = require('../../model');





// GETALL
router.get('/', async(req, res, next) => {
        try {
            const contacts = await Contact.find();
            res.json(contacts);
        } catch (error) {
            next(error);
        }

    })
    // GetByID
router.get('/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        const contacts = await Contact.findById(id);
        res.json(contacts);
        if (!contacts) {
            throw createError(404, "Not found");
        }
    } catch (error) {
        if (error.message.includes("Cast to ObjectId failed")) {
            error.status = 404;
        }
        next(error);
    }

});
// ADD
router.post('/', async(req, res, next) => {
        try {

            const newContacts = await Contact.create(req.body);
            res.status(201).json(newContacts);
        } catch (error) {
            if (error.message.includes("validation failed")) {
                error.status = 400;
            }
            next(error);
        }
    })
    // GEtBYREMOVE
router.delete('/:id', async(req, res, next) => {
        try {
            const { id } = req.params;
            const deleteContacts = await Contact.findByIdAndRemove(id);
            if (!deleteContacts) {
                throw createError(404, "Not found");
            }
            res.json({ "message": "contact deleted" })
        } catch (error) {
            if (error.message.includes("Cannot read")) {
                error.status = 400;
            }
            next(error);
        }
    })
    // GETBYUPDATE
router.put('/:id', async(req, res, next) => {
    try{
        const { id } = req.params;
        const updateContacts = await Contact.findByIdAndUpdate(id, req.body, { new: true });

        if (!updateContacts) {
            throw createError(404, "Not found");
        }
        res.json(updateContacts);

    } catch (error) {
        if (error.message.includes("Cannot read")) {
            error.status = 400;
        }
        next(error);
    }

})
//GETBYUPDATE
router.put('/:id', async (req, res, next) => {
  try{
const {id} = req.params;
const updateContacts=await contactsOperation.updateById({id, ...req.body});
const {error} = joiSchema.validate(req.body);
if(error){
  error.status = 400;
  throw error;
}
if(!updateContacts){
  throw new createError(404, "Not found");
}
res.json(updateContacts);


router.patch("/:id/favorite", async(req, res, next) => {
    try {
        const { id } = req.params;
        const { favorite } = req.body;
        const updateContacts = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });

        if (!updateContacts) {
            throw createError(404, "Not found");
        }
        res.json(updateContacts);

    } catch (error) {
        if (error.message.includes("Cannot read")) {
            error.status = 400;
        }
        next(error);
    }

})

module.exports = router