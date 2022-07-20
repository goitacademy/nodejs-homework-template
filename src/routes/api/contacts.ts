"use strict"
import express, {
    Response,
    Request,
    NextFunction,
} from 'express';

import { validateContactAdd } from './helpers/validateContactAdd';
import contactsDBModel from '../../models/contacts';
import { createError } from '../../helpers/createError';

// const contactsActions = require('../../models/contacts/Interfaces/contactIterface');

// const createError = require('../../helpers/createError');

const router = express.Router();

// router.get("/", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await 
//     } catch (error) {

//     }
// })
validateContactAdd({ name: "qwrertr", email: "fggdgd", phone: "34765877" });

export default router;
