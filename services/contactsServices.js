const Contact = require('../models/contact');

const getAll = async () => {
    const data = await Contact.find();
    return data;
};

const getById = async id => {
    const data = await Contact.findOne({ _id: id });
    return data;
};

const createNew = async contact => {
    const data = await Contact.create(contact);
    return data;
};

const deleteById = async id => {
    const result = await Contact.deleteOne({ _id: id });
    return result;
};

const updateById = async (id, update) => {
    const data = await Contact.updateOne({ _id: id }, update);
    return data;
};

const updateStatus = async (id, body) => {
    const data = await Contact.updateOne({ _id: id }, { favorite: body });
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
