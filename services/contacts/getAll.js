// пагінація для колекції контактів
// фільтрація контактів по полю обраного(populate)


const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const getAll = async ({ id, skip, limit, favorite }) => {
    try {
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
       
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getAll;