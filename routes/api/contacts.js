const express = require('express');

const createError = require('http-errors');

const router = express.Router()

const { Contact } = require('../../models');

const { authenticate } = require("../../middlewares");

// GETALL
router.get('/', authenticate, async(req, res, next) => {
        try {
            const { _id } = req.user;
            const contacts = await Contact.find({ owner: _id }, "_id name email phone favorite");
            res.json(contacts);
        } catch (error) {
            next(error);
        }

    })
    // GetByID
router.get('/:id', authenticate, async(req, res, next) => {
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
router.post('/', authenticate, async(req, res, next) => {

        console.log(req.user);
        try {
            const { _id } = req.user;
            const newContacts = await Contact.create({...req.body, owner: _id });
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
        try {
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
    // GETBYUPDATE
router.put('/:id', async(req, res, next) => {
    try {
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
});

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

module.exports = router;