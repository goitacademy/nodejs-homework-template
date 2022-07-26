'use strict'

import { validateContactAdd } from './helpers/validateContactAdd';
import contactsDBModel from '../../../models/contacts';
import { createError } from '../../../helpers/createError';
import { IContactGet } from '../../../Interfaces/contactIterfaces';
import {
    Request,
    Response
} from 'express';

const postContact = async (req: Request, res: Response) => {
    const { body } = req;
    const { error } = validateContactAdd(body);
    if (error) {
        throw createError('400');
    }
    const result: IContactGet | null = await contactsDBModel.contactsActions.addContact(body);
    if (!result) {
        throw createError("404");
    }
    res.json(result);
}

export default postContact;