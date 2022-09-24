const Contact = require('../models/contact');
const RequestError = require('../helpers/RequestError');

const getAll = async () => {
    const data = await Contact.find();
    return data;
};

const getById = async id => {
    const data = await Contact.findById(id);

    if (!data) throw RequestError(404, 'Not found');

    return data;
};

const createNew = async contact => {
    const data = await Contact.create(contact);
    return data;
};

const deleteById = async id => {
    const result = await Contact.findByIdAndRemove(id);

    if (!result) throw RequestError(404, 'Not found');

    return result;
};

const updateById = async (id, update) => {
    const data = await Contact.findByIdAndUpdate(id, update, { new: true });

    if (!data) throw RequestError(404, 'Not found');

    return data;
};

const updateStatus = async (id, body) => {
    const data = await Contact.findByIdAndUpdate(id, body, { new: true });

    if (!data) throw RequestError(404, 'Not found');

    return data;
};

module.exports = {
    getAll,
    getById,
    createNew,
    deleteById,
    updateById,
    updateStatus,
};
