const Contact = require('../models/contact');
const { ctrlWrapper, HttpError } = require('../helpers');



const getAll = async (req, res) => {
    const result = await Contact.find();
    console.log(result);
    res.json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json(result)
};

const add = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const update = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json(result);
};

const remove = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json({
        message: "Contact deleted",
        result
    })
};

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) throw HttpError(404, `Not found contact with id: ${contactId}`);
    res.json({
        message: "Switch favorite status",
        result
    });
}


module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    remove: ctrlWrapper(remove),
    update: ctrlWrapper(update),
    updateStatusContact: ctrlWrapper(updateStatusContact),
}