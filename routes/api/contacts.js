const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts')
const {
  validationCreateContact,
  validationUpdateContact,
  validationObjectId,
} = require('./validator-router')

const handleError = require('../../helpers/handle-error')
router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      }
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', validationObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id)
    console.log(contact.nick);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: 'Not found'
      })  
    } else {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        }
      })
    }    
  } catch (e) {
    next(e)
  }
})

router.post('/',
  validationCreateContact,
  handleError(async (req, res, next) => {
    const contact = await Contacts.addContact(req.body)
      return res.status(201).json({
        status: "created",
        code: 201,
        data: {
          contact,
        },
      })
    }),
)

// router.post('/', validationCreateContact, async (req, res, next) => {
//   try {
//     const { name } = req.body;
//     const { email } = req.body;
//     const contact = await Contacts.addContact(req.body)
//     if (name && email) {
//       return res.status(201).json({
//         status: "created",
//         code: 201,
//         data: {
//           contact,
//         }
//       })
//     } else {
//       return res.json({ message: "missing required field" })
//     }
//   }catch (e) {
//     next(e)
//   }
// })

router.put('/:id', validationUpdateContact, async (req, res, next) => {
  try {
    // const { id } = req.params;
    // const { body } = req;
    // console.log(body);
    const contact = await Contacts.updateContact(req.params.id, req.body)
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: 'Not found'
      })  
    } else {
      // if (Object.keys(req.body).length !== 0){
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
            // ...body
          }
        })
      // } else {
      //   return res.json({
      //     message : "missing fields"
      //   })
      }
    // }    
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contacts.removeContact(id) 
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: 'Not found'
      })
    } else {
      return res.json({
        status: "success",
        code: 200,
        message: "Contact deleted!",
        // data: contact
      })
    }    
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', validationUpdateContact, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    console.log(body);
    const contact = await Contacts.updateContact(id)
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: 'Not found'
      })  
    } else {
      if (Object.keys(req.body).length !== 0){
        return res.json({
          status: "success",
          code: 200,
          data: {
            ...contact,
            ...body
          }
        })
      } else {
        return res.json({
          message : "missing fields"
        })
      }
    }    
  } catch (e) {
    next(e)
  }
})

router.patch('/:id/favorite', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contacts.updateStatusContact(id)
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: 'Not found'
      })  
    } else {
      if (Object.keys(req.body).length !== 0) {
        return res.json({
          status: "success",
          code: 200,
          data: {
            ...contact,
            ...req.body
          }
        })
      } else {
        return res.json({
          message : "missing fields"
        })
      }
    }    
  } catch (e) {
    next(e)
  }
})



module.exports = router
