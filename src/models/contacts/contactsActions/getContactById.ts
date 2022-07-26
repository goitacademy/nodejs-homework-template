"use strict"

import { IContactGet } from "../../../Interfaces/contactIterfaces";
import { listContacts } from './listContacts';

export const getContactsById = async (id: string) => {
    const contactList: IContactGet[] | null = await listContacts();

    if (!contactList) {
        return null;
    }
    const result: IContactGet | undefined = contactList.find(item => item.id === id);
    if (!result) {
        return null;
    }
    return result;
}