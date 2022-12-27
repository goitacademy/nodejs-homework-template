const getAll = require("./getAll");
const contactsPath = require("./filePath");
const fs = require("fs/promises");



const remuveById = async (id) => {
    // const contactsId = String(id)
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result
};

module.exports = remuveById;