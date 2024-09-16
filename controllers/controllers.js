const {Contact} = require("../models/contacts/contacts")

async function listContacts ( req, res, next) {
    try {
        const { _id } = req.user;
        const { page = 1, limit = 5} = req.query;
        const skip = (page - 1) * limit;
        const query = { owner: _id };
        const contacts = await Contact.find(query, '', {
            skip,
            limit: Number(limit),
        });
        res.status(200).json(contacts);
    }
    catch(error) {
        next(error);
    }
}

async function getContactById (req, res, next) {
    try {
        const {id} = req.params;
        const result = await Contact.findById(id);
        if(!result) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}

async function removeContact (req, res, next) {
    try {
        const {id} = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if(!result) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        return res.status(200).json({
            message: "contact deleted"
        })
    }
    catch(error) {
        next(error);
    }
}

async function addContact (req, res, next) {
    try {
        const {_id: owner} = req.user;
        const result = await Contact.create({...req.body, owner});
        res.status(201).json(result);
    }
    catch(error) {
        next(error);
    }
}

async function updateContact (req, res, next) {
    try {
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
        if(!result) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}

async function updateStatusContact (req, res, next) {
    try {
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
        if(!result) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        res.status(200).json(result);
    }
    catch(error) {
        next(error);
    }
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
}