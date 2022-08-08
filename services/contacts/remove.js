// видаляє контакт


const { basedir } = global;

const { Contact } = require(`${basedir}/models/contact`);

const { asyncWrapper } = require(`${basedir}/helpers`);

const remove = asyncWrapper(async ({ id }) => {
    const data = await Contact.findByIdAndRemove(id);

    if (!data) {
        return null;
    }

    return data;
});

module.exports = remove;

