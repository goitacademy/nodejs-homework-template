import  contactsService from "../models/contacts.js";
const getAll = async (req, res, next) => {
    const result = await contactsService.listContacts();

    res.json(result);
}

export default {
    getAll,
}