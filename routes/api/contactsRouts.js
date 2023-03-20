const express = require('express')

const contactController = require('../../controllers/contactController')
const contactMiddlewares = require('../../middlewares/contactMiddlewares')

const router = express.Router()

router.route('/')
  .get(contactController.listContacts)
  .post(
    contactMiddlewares.checkNewContactData,
    contactController.addContact
  );
  

router.use('/:id', contactMiddlewares.checkContactId);

router
  .route('/:id')
  .get(contactController.getById)
  .patch(
    contactMiddlewares.checkChangedContactData,
    contactController.updateContact
  )
  .delete(contactController.removeContact);

router
  .route('/:id/favorite')
  .patch(
  contactMiddlewares.checkStatusData,
  contactController.updateStatusContact
)
module.exports = router;
