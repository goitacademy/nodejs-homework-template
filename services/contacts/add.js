const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const add = async ({ id, body }) => {
    try {
        const data = await Contact.create({ ...body, owner: id });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = add;
