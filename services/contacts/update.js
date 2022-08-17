// оновлює контакт


const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const { asyncWrapper } = require(`${basedir}/helpers`);

const update = asyncWrapper(async ({ id, body }) => {
    const data = await Contact.findByIdAndUpdate(id, body, { new: true });

    if (!data) {
        return null;
    }

    return data;
});

module.exports = update;

