import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} from '../models/contacts.js';


const getAll = async (req, res) => {
    try {
        const result = await listContacts();
        res.json(result);
    }
    catch (error){
            res.status(500).json({message:error.message})
        }
};




export default {
    getAll
}