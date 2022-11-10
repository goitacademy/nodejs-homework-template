import Contact from '../schemas/contact.js';

export const getAllContacts =()=>{
    return Contact.find();
}

export const getContactById = (id)=>{
    return Contact.findById(id);
}

export const createContact = (contact) =>{
    return Contact.create(contact);
}

export const deleteContactById = (id) =>{
    return Contact.findByIdAndDelete(id);
}

export const updateContactById = (id, body) =>{
    return Contact.findByIdAndUpdate(id, body, {new:true, runValidators: true})
}

export const updateStatusById = (id, body) =>{
    return Contact.findOneAndUpdate(id, body, {new:true, runValidators: true})
}