import listContacts from '../../models/contacts/listContacts';

const listContactsController = async (req, res, next) => {
    const contacts = await listContacts();
    res.status(200).json(contacts);
}

export default listContactsController;