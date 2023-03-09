//перероблено на монгус

import Contact from '../schemas/contactsModel.js';

export const listContacts = async () => {
  try {
    const data = await Contact.find();
    return data;
  } catch (err) {
  console.log(err.message)
  };
};

export const getContactById = async (id) => {
  try {
    const contacts = await Contact.findById(id);
    return contacts;
  } catch(err){
  console.log(err.message)
  }
};

export const removeContact = async (id) => {
  try {
    const contacts = await Contact.findByIdAndRemove(id);
    return contacts;
  } catch(err){
console.log(err.message)
  }
};

export const addContact = async ({name, email, phone}) => {
  try {
    const newContacts = await Contact.create({name, email, phone});
        return newContacts;
  } catch (err) {
 console.log(err.message)
  }
};

export const updateContact = async (id, body) => {
  try {
    const contactsUpd = await Contact.findByIdAndUpdate(id, body,{ new: true });
    return contactsUpd  
  } catch(err){
console.log(err.message)
  }
};
