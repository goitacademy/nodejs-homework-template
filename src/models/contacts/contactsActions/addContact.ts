"use strict"

import { IContactGet, IContactAdd } from "../../../Interfaces/contactIterfaces";
import { updateContactList } from './helpers/updateContactList';
import { v4 as generateId } from 'uuid';
import { listContacts } from './listContacts';

export const addContact = async ({ name, email, phone }: IContactAdd) => {
    const contact: IContactGet = {
        id: generateId(),
        name,
        email,
        phone,
    }

    const contacts: IContactGet[] | null = await listContacts();

    //for the first element in data base
    if (!contacts) {
        const newList: IContactGet[] = [];
        newList.push(contact);
        updateContactList(newList);
        return contact;
    }

    contacts.push(contact);
    await updateContactList(contacts);
    return contact;
}
