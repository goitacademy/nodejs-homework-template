"use strict"

import { IContactGet } from "../../../Interfaces/contactIterfaces";
import { listContacts } from './listContacts';
import { updateContactList } from './helpers/updateContactList';

export const deleteContactById = async (id: string) => {
    const contacts: IContactGet[] | null = await listContacts();

    // data base empty
    if (!contacts) {
        return null;
    }

    const idx: number = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
        return null;
    }
    const [contactDeleted] = contacts.splice(idx, 1);

    await updateContactList(contacts);

    return contactDeleted;
}
