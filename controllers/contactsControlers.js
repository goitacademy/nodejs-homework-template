const { v4: id } = require("uuid");
const { addContactShema, updateContactSchema } = require("../schema/schema");
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById
} = require("../models/contacts");

const tryCatchWrapper = (fn) => async (req, res) => {
    try {
        const result = await fn(req, res);
        return result;
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const getContacts = tryCatchWrapper(async (req, res) => {
    const data = await listContacts();
    res.json(data);
});

const ContactById = tryCatchWrapper(async (req, res) => {
    const data = await getContactById(req.params.contactId);
    if (data.length === 0) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    return res.json(data);
});

const newContact = tryCatchWrapper(async (req, res) => {
    const { error, value } = addContactShema.validate(req.body);
    console.log(addContactShema).validate(res.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, phone } = value;
    const contact = { id: id(), name, email, phone };
    const data = await addContact(contact);
    res.status(201).json(data);
});

const deleteContact = tryCatchWrapper(async (req, res) => {
    const { contactId: id } = req.params;
    const contactRemove = await removeContact(id);
    if (!contactRemove) {
        return res.status(404).json({
            message: "Not found",
        });
    }
    return res.status(200).json({
        message: "Contact deleted"
    });
});

const updateContact = tryCatchWrapper(async (req, res) => {
    const { name, email, phone } = req.body;

    if (name || email || phone) {
        const { error } = updateContactSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const data = await updateContactById(req.params.contactId, req.body);
        if (!data) {
            return res.status(400).json({ message: "Not found" });
        }
        return res.json(data);
    }
    return res.status(400).json({ message: "Missing reqired name field" });
});




module.exports = {
    ContactById,
    getContacts,
    newContact,
    deleteContact,
    updateContact,
};