import Contact from "../model/model.js";
const getAllContacts = async () => Contact.find({}).lean();
const getOneContact = async (contactId) => {
    try {
        const contacts = await getAllContacts();
        const contact = contacts.find(({ id }) => id === contactId);
        if (contact) {
            return Contact.findById(contact._id);
        } else {
            
            return Contact.findById(contactId);;
        }
    } catch (error) {
        console.log(error);
    }
   

};


const createContact = async (body) => Contact.create(body);

const deleteContact = async (contactId) => {
    try {
        const contacts = await getAllContacts();
        const contact = contacts.find(({ id }) => id === contactId);
        if (contact) {
            return Contact.findByIdAndDelete(contact._id);
        } else {

            return Contact.findByIdAndDelete(contactId);;
        }
    } catch (error) {
        console.log(error);
    }


};

const updateContact = async (contactId, body) => {
    try {
        const contacts = await getAllContacts();
        const contact = contacts.find(({ id }) => id === contactId);
        if (contact) {
            return Contact.findByIdAndUpdate({ _id: contact._id, }, { $set: body },
        {
            new: true,
            runValidators: true,
            strict: "throw",
        }
    );
        } else {

            return Contact.findByIdAndUpdate({ _id: contactId, },  { $set: body },
        {
            new: true,
            runValidators: true,
            strict: "throw",
        }
    );;
        }
    } catch (error) {
        console.log(error);
    }


};



export {
    getAllContacts,
    getOneContact,
    createContact,
    deleteContact,
    updateContact,
};