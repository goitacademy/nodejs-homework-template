import repositoryContacts from '../../repository/contacts';
import { HttpCode } from '../../lib/constants';

const getContacts = async (req, res, next) => {
    const contacts = await repositoryContacts.listContacts(req.query);
    res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: contacts });
};

const getContactById = async (req, res, next) => {
    const { id } = req.params;
    const contact = await repositoryContacts.getContactById(id);
    if (contact) {
        return res
            .status(HttpCode.OK)
            .json({ status: 'success', code: HttpCode.OK, data: { contact } });
    }
    res
        .status(HttpCode.NOT_FOUND)
        .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
};

const addContact = async (req, res, next) => {
    const newContact = await repositoryContacts.addContact(req.body);
    res.status(HttpCode.CREATED).json({
        status: 'success', code: HttpCode.OK, data: { contact: newContact },
    });
};

const removeContact = async (req, res, next) => {
    const { id } = req.params;
    const contact = await repositoryContacts.removeContact(id);
    if (contact) {
        return res
            .status(HttpCode.OK)
            .json({ status: 'success', code: HttpCode.OK, data: { contact } });
    }
    res
        .status(HttpCode.NOT_FOUND)
        .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
};

const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const contact = await repositoryContacts.updateContact(id, req.body);
    if (contact) {
        return res
            .status(HttpCode.OK)
            .json({ status: 'success', code: HttpCode.OK, data: { contact } });
    }
    res
        .status(HttpCode.NOT_FOUND)
        .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
};

export {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
};