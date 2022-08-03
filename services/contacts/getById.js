const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const getById = async (id) => {
    try {
        const data = await Contact
        .findById(id)
        .populate('owner', 'email subscription');

        if (!data) {
            return null;
        }

        return data;

    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getById;
