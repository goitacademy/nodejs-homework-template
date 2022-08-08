// отримує всі контакти
// пагінація для колекції контактів
// фільтрація контактів по полю обраного(populate)


const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const { asyncWrapper } = require(`${basedir}/helpers`);

const getAll = asyncWrapper(async ({ id, skip, limit, favorite }) => {
    if (skip || limit) {
        const data = await Contact
        .find({ owner: id }, '', { skip, limit: Number(limit)})
        .populate('owner', '_id username email');

        return data;
    }

    if (favorite) {
        const data = await Contact
        .find({ favorite: favorite })
        .populate('owner', '_id username email');

        return data;
    }
});

module.exports = getAll;