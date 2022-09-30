const { Contact } = require('../models');
const { RequestError } = require('../helpers');

const getAll = async (id, page, limit, favorite) => {
    const searchOptions = favorite ? { owner: id, favorite } : { owner: id };
    const paginationOptions = {
        skip: (page - 1) * limit,
        limit: Number(limit),
    };

    const data = await Contact.find(
        searchOptions,
        '',
        paginationOptions,
    ).populate('owner', 'email subscription');

    return data;
};

const getById = async id => {
    const data = await Contact.findById(id).populate(
        'owner',
        'email subscription',
    );

    if (!data) throw RequestError(404, 'Not found');

    return data;
};

const createNew = async (contact, userId) => {
    const data = await Contact.create({ ...contact, owner: userId });
    return data;
};

const deleteById = async id => {
    const result = await Contact.findByIdAndRemove(id);

    if (!result) throw RequestError(404, 'Not found');

    return result;
};

const updateById = async (id, update) => {
    const data = await Contact.findByIdAndUpdate(id, update, {
        new: true,
    }).populate('owner', 'email subscription');

    if (!data) throw RequestError(404, 'Not found');

    return data;
};

const updateStatus = async (id, body) => {
    const data = await Contact.findByIdAndUpdate(id, body, {
        new: true,
    }).populate('owner', 'email subscription');

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
