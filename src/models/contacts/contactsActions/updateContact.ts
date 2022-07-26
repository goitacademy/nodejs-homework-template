"use strict"

import { IContactAdd, IContactGet } from "../../../Interfaces/contactIterfaces";
import { listContacts } from './listContacts';
import { updateContactList } from "./helpers/updateContactList";

export const updateContact = async (id: string, { name, email, phone }: IContactAdd) => {

    const contacts: IContactGet[] | null = await listContacts();

    // empty Data Base
    if (!contacts) {
        return null;
    }

    const idx: number = contacts.findIndex(item => item.id === id);

    //no contact with searched id in the Data Base
    if (idx === -1) {
        return null;
    }

    contacts[idx] = {
        ...contacts[idx],
        name,
        email,
        phone,

    }

    await updateContactList(contacts);
    return contacts[idx];
}

