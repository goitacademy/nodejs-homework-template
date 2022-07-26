"use strict"

import express, {
    Response,
    Request,
    NextFunction,
} from 'express';

import actions from './actions';
import verifyAction from './helpers/verifyAction';

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    await verifyAction(req, res, next, actions.getContacts);
})

router.get('/:contactId', async (req: Request, res: Response, next: NextFunction) => {
    await verifyAction(req, res, next, actions.getContactById);
})
router.post("/", async (req, res, next) => {
    await verifyAction(req, res, next, actions.postContact);
})

router.delete('/:contactId', async (req, res, next) => {
    await verifyAction(req, res, next, actions.deleteContactById);
})
router.put('/:contactId', async (req, res, next) => {
    await verifyAction(req, res, next, actions.putContactById);
})

export default router;
