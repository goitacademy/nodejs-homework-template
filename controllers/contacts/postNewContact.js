
const fs = require('fs/promises')
const path = require('path')
const { Contact } = require('../../models/contact')

const contactsDir = path.join(__dirname, '../../', 'public/avatars')

const postNewContact = async (req, res, next) => {
  console.log('req.body :>> ', req.body)
  console.log('req.file :>> ', req.file)
  // const { name, email, phone } = req.body
  const { originalname, path: tempName } = req.file
  const { _id } = req.user
  console.log('_id :>> ', _id)
  const newContact = { ...req.body, owner: _id }
  const result = await Contact.create(newContact)
  const [extention] = originalname.split('.').reverse()
  const newFileName = `contact_main-image_${result._id}.${extention}`
  const resultStorage = path.join(contactsDir, newFileName)
  await fs.rename(tempName, resultStorage)
  const photo = path.join('/contacts', newFileName)
  const contact = Contact.findByIdAndUpdate(result._id, { photo }, { new: true })
  res.status(201).json({
    status: 'success',
    code: 201,
    data: contact
  })
}

module.exports = postNewContact
