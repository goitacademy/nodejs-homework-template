"use strict"
import { listContacts } from './listContacts';
import { getContactsById } from './getContactById';
import { addContact } from './addContact';
import { deleteContactById } from './deleteContactById';
import { updateContact } from './updateContact';
import { IContactActions } from "../../../Interfaces/contactIterfaces";


const contactsActions: IContactActions = {
    listContacts,
    getContactsById,
    addContact,
    deleteContactById,
    updateContact
}

export default contactsActions;