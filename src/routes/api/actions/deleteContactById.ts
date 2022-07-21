'use strict'

import contactsDBModel from '../../../models/contacts';
import { createError } from '../../../helpers/createError';
import { IContactGet } from '../../../Interfaces/contactIterfaces';
import {
    Request,
    Response
} from 'express';

const deleteContactById = async (req: Request, res: Response) => {
    const { contactId } = req.params;
    const result: IContactGet | null = await contactsDBModel.contactsActions.deleteContactById(contactId);
    if (!result) {
        throw createError("404");
    }
    res.json(result);
}

export default deleteContactById;