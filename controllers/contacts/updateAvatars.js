const fs = require('fs/promises')
const path = require('path')
const CreateError = require('http-errors')

const { Contact } = require('../../model')

const contactsDir = path.join(__dirname, '../../public/avatar')

const updateAvatars = async (req, res, next) => {
  const { contactId } = req.params
  const { path: tempUpload, originalname } = req.file
  const fileName = `${contactId}_${originalname}`
  try {
    const resultUpload = path.join(contactsDir, contactId, fileName)
    await fs.rename(tempUpload, resultUpload)
    const avatar = path.join('/contacts', contactId, fileName)

    const result = await Contact.findByIdAndUpdate(
      contactId,
      { avatar },
      { new: true }
    )
    if (!result) {
      throw new CreateError(404, `Contact with id-'${contactId}' not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    next(error)
  }
}

module.exports = updateAvatars
