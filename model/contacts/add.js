const {v4} = require("uuid");

const updateProducts = require("./updateContacts");
const getAll = require("./getAll");

const add = async(data)=> {
    const contacts = await getAll();
    const newContacts = {...data, id: v4()};
    contacts.push(newContacts);
    await updateProducts(contacts);
    return newContacts;
}

module.exports = add;