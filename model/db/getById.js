const getAll = require("./getAll")


const getById = async (id) => {
    const contactsId = String(id)
    const contacts = await getAll();
    const result = contacts.find(item => item.id === contactsId);
    
    return result || null;
}

module.exports = getById;