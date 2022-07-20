"use strict"

import fs from 'fs/promises';
import contactsDBModel from '../..';
import { TContactAdd } from '../../../../Interfaces/contactIterfaces'

export const updateContactList = async (contacts: TContactAdd[]) => {
    await fs.writeFile(contactsDBModel.contactsPath, JSON.stringify(contacts, null, 2));
}

