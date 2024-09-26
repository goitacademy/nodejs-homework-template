import express from "express"

import contactsCTRL from "../../controllers/contactsCTRL.js";

const router = express.Router()


router.get('/', contactsCTRL.getAllContacts)

router.get('/:contactId',contactsCTRL.getContactById)

router.post('/',contactsCTRL.addContact)

router.delete('/:contactId', contactsCTRL.removeContact)

router.put("/:contactId", contactsCTRL.updateContact)

 router.patch("/:contactId/favorite", contactsCTRL.updateFavorite);



export default router
