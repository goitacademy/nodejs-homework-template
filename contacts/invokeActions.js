const { updateContact } = require('../model');
const { getContacts, getById, putById, deleteById } = require('./index');

const invokeActions = async (action = 'getAll', id, data) => {
  switch (action) {
    case 'getAll':
      const contacts = await getContacts();
      return contacts;

    case 'getById':
      const contact = await getById(id);
      if (!contact) throw new error(`Contact with id ${id} was not found`);
      console.log(contact);
      return contact;

    case 'putById':
      const updatedContact = await putById(id, data);
      if (!updateContact) throw new error(`Contact with id ${id} was not found`);
      return updatedContact;

    case 'deleteById':
      const deletedContact = await deleteById(id);
      return deletedContact;

    default:
      console.log(`Action type ${action} not found`);
  }
};

invokeActions('deleteById', 1);
