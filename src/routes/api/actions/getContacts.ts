'use strict'

import contactsDBModel from '../../../models/contacts';
import { createError } from '../../../helpers/createError';
import { IContactGet } from '../../../Interfaces/contactIterfaces';
import {
    Request,
    Response
} from 'express';

const getContacts = async (req: Request, res: Response) => {
    const result: IContactGet[] | null = await contactsDBModel.contactsActions.listContacts();
    if (!result) {
        throw createError("404");
    }
    res.json(result);
}
export default getContacts; 
