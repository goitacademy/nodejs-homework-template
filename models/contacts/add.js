const {v4} = require("uuid");

const updateContacts = require("./updateContacts");
const getAll = require("./getAll");

const add = async(data)=> {
    const newContacts = {...data, id: v4()};
    const contacts = await getAll();
    contacts.push(newContacts);
    await updateContacts(contacts);
    return newContacts;
}

module.exports = add;