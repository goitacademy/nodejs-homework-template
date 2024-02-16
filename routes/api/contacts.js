
import express from "express";

import  contactContollers  from "../../controllers/contacts-controller.js";
import contactSchema from '../../models/contacts.js'
import validateBody from "../../decorators/validateBody.js";
import {isValidId, authenticate} from '../../midllewares/midle-index.js'



const router = express.Router();


 


const contactValidateBody = validateBody(contactSchema);

router.use(authenticate);

router.get('/', contactContollers.getAll);

router.get('/:contactId', isValidId,  contactContollers.getById);

router.post('/', contactValidateBody, contactContollers.add);



router.delete('/:contactId', isValidId, contactContollers.deleteById);
router.patch('/:contactId/favorite', contactContollers.updateFavorite);
router.put('/:contactId',  contactContollers.updateById);




export default router
