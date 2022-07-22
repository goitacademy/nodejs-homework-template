'use strict'

import { validateContactAdd } from './helpers/validateContactAdd';
import contactsDBModel from '../../../models/contacts';
import { createError } from '../../../helpers/createError';
import { IContactGet } from '../../../Interfaces/contactIterfaces';
import {
    Request,
    Response
} from 'express';

const putContactById = async (req: Request, res: Response) => {
    const { body } = req;
    const { error } = validateContactAdd(body);
    if (error) {
        throw createError("400");
    }
    const { contactId } = req.params;
    const result: IContactGet | null = await contactsDBModel.contactsActions.updateContact(contactId, body);
    if (!result) {
        throw createError("404");
    }
    res.json(result);
}

export default putContactById;