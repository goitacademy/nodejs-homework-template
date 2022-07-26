"use strict"

import { IContactGet } from "../../../Interfaces/contactIterfaces";
import { readFile } from 'fs/promises';
import contactsDBModel from '../';

export const listContacts = async (): Promise<IContactGet[] | null> => {
    const data: string = await readFile(contactsDBModel.contactsPath, 'utf-8');
    if (!data) {
        return null;
    }
    const result: IContactGet[] | null = JSON.parse(data);
    return result;
}

