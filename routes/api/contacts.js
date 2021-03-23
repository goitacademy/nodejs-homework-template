const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");
const bodyJSON = express.json();

router.get("/", async (_, res, next) => {
    try {
        const contacts = await Contacts.listContacts();
        return res.json({
            message: "All contacts",
            status: "SUCCES",
            code: 200,
            data: {
                contacts,
            },
        });
    } catch (err) {
        next(err);
    }
});

router.get("/:contactId", async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contacts.getContactById(contactId);
        if (contact) {
            return res.json({
                message: "Contact by id",
                status: "SUCCES",
                code: 200,
                data: { contact },
            });
        } else {
            return res.status(404).json({
                message: "Not Found Contact",
                status: "ERROR",
                code: 404,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.post("/", bodyJSON, async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            const requireFields = ["name", "email", "phone"];
            const errMessage = requireFields
                .filter((item) => !Object.keys(req.body).includes(item))
                .reduce(
                    (acc, item) =>
                        `${acc}Missing required '${item.toUpperCase()}' field! `,
                    ""
                );
            return res.status(400).json({
                status: "ERROR",
                code: 400,
                data: { message: errMessage },
            });
        } else {
            const newContact = await Contacts.addContact(req.body);
            return res.status(201).json({
                message: "Contact Added",
                status: "SUCCES",
                code: 201,
                data: { newContact },
            });
        }
    } catch (err) {
        next(err);
    }
});

router.delete("/:contactId", async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contacts.removeContact(contactId);
        if (contact) {
            res.json({
                status: "SUCCES",
                code: 200,
                data: { message: "Contact DELETED" },
            });
        } else {
            return res.status(404).json({
                message: "Not Found Contact",
                status: "ERROR",
                code: 404,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.patch("/:contactId", bodyJSON, async (req, res, next) => {
    try {
        const { body } = req;
        const { contactId } = req.params;
        const contact = await Contacts.updateContact(contactId, body);
        if (contact) {
            res.json({
                message: "Contact UPDATED",
                status: "SUCCES",
                code: 200,
                data: contact,
            });
        } else {
            res.status(404).json({
                status: "ERROR",
                code: 404,
                data: { message: "Not Found Contact" },
            });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
