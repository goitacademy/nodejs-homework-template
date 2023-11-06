// import contactService from '../models/contacts/index.js'
import { ModelContacts } from '../models/Model-contacts.js';
import { httpError, sendEmail } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js'




const getAll = async (req, res) => {
    const { page = 1, limit = 10, favorite = [true, false] } = req.query;
    const skip = (page - 1) * limit;
    const result = await ModelContacts.find({ favorite }, null, { skip, limit });
    sendEmail('peralat152@undewp.com', 'HTML', "<p>Hello world!</p>", "Test 1000",)

    if (!result) {
        throw httpError(404, `Movies not found`);
    }
    res.status(200).json(result);

}
const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await ModelContacts.findById(contactId);
    if (!result) {
        throw httpError(404, `Movie with ${contactId} not found`);
    }
    res.status(200).json(result);
}
const addNew = async (req, res) => {
    const result = await ModelContacts.create(req.body);
    res.status(201).json(result);

}
const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await ModelContacts.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
    if (!result) {
        throw httpError(404, `Movie with ${contactId} not found`);
    }
    res.status(200).json(result);
}
const updateByIdFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await ModelContacts.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw httpError(404, `Not found`);
    }
    res.status(200).json(result);
}

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await ModelContacts.findByIdAndRemove({ _id: contactId });
    if (!result) {
        throw httpError(404, `Movie with ${contactId} not found`);
    }
    res.status(200).json({
        message: "contact deleted"
    });
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addNew: ctrlWrapper(addNew),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateByIdFavorite: ctrlWrapper(updateByIdFavorite)
}
