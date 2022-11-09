const { json } = require("express");
const { Contact } = require("../Validations/contactShema");

async function getAll(req, res, next) {
    try {
        const { _id: owner } = req.user;
        console.log(owner)
        const contacts = await Contact.find({ owner });
        if (contacts) {
            return res.json({
                data: contacts
            })
        } else {
            return res.status(404).json({ message: 'Not Found' });
        }
    } catch(err) {
        next(err)
    }
}


async function findOneById(req, res, next) {
    try {
        const { _id: owner } = req.user;
        const { id } = req.params;
        const contact = await Contact.findById({_id: id, owner});
        if (contact) {
            return res.json({ data: { contact } });
        } else {
            return res.status(404).json({ message: 'Not Found' });
        }
    } catch(err) {
        return res.status(404).json({ message: `'Not Found' ${err.message}` });
    }    
}


async function create(req, res, next) {
    try {
        const { _id: owner } = req.user;
        const contact = req.body;
        const createdContacts = await Contact.create({ ...contact, owner });
        if (createdContacts) {
            return res.status(201).json({
            contact: createdContacts     
        })
        } else {
            return res.status(404).json({ message: 'Not Found' });
        }
    } catch (err) {
        return res.status(400).json({ message: JSON.stringify(err.message) });
    }
}


async function deleteById(req, res, next) {
    try {
        const { _id: owner } = req.user;
        console.log(owner)
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete({_id: id, owner});
        if (contact) {
            return res.json({ data: { contact } });
        } else {
            return res.status(404).json({ message: 'Not Found' });
        }
    } catch(err) {
        return res.status(404).json({ message:  err.message });
    }
}

async function updateById(req, res, next) {
    try {
        const { _id: owner } = req.user;
        const { id } = req.params;
        const contact = req.body;
        const updateContact = await Contact.findByIdAndUpdate(id, {...contact, owner}, { new: true });
        return res.status(201).json({contact: updateContact});
    } catch(err) {
        return res.status(404).json({ message: err.message });
    }
}

async function updateStatusContact(req, res, next) {
    try {
        const { _id: owner } = req.user;
        const { contactId } = req.params;
        const { favorite } = req.body;
        const result = await Contact.findByIdAndUpdate({_id: contactId, owner},{ favorite },{ new: true });
        return res.status(200).json({ status: "success", code: 200, data: { result }, });
    } catch(err) {
        return res.status(404).json({ message: `'Not Found' ${err.message}` });
    }
};


module.exports = {
    getAll,
    create,
    deleteById,
    updateById,
    findOneById,
    updateStatusContact
}