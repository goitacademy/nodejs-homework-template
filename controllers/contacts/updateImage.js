const fs = require('fs/promises')
const path = require('path')
const moment = require('moment')

const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const contactsDir = path.join(__dirname, '../../public/avatars')

const updateImage = async (req, res, next) => {
  const { id } = req.params
  const { path: tempUpload, originalname } = req.file
  try {
    const date = moment().format('DD-MM-YYYY_hh-mm-ss')
    const filename = `${id}_${date}_${originalname}`
    const resultUpload = path.join(contactsDir, id, filename)
    await fs.rename(tempUpload, resultUpload)
    const image = path.join('./contacts', id, filename)
    const result = await Contact.findByIdAndUpdate(id, { image }, { new: true })
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    throw error
  }
}

module.exports = updateImage
