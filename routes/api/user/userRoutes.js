const express = require('express')
const {users} = require("../../../controllers")
const { register, login, logout, current } = users;
const { checkRegisterData, protect } = require("../../../middlewares/user/userMiddleware");
const router = express.Router()


router
  .route('/register')
  .post(checkRegisterData, register)
  
router
  .route('/login')
  .post(login)

router.use(protect)
  
router
  .route('/logout')
  .post( logout)

router
  .route('/current')
  .get(current) 

module.exports = router




// router.get('/', async (req, res, next) => {
//   const result = await contacts.listContacts();
//   res.json(result)
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
