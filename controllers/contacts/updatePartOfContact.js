import { updateContact } from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
import { NotFound } from '../../lib/messages'
// import { colors } from '../../helpers'

const updatePartOfContact = async (req, res, next) => {
  const { id } = req.params
  const contact = await updateContact(id, req.body)
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } })
    // .json(
    //   { status: 'success', code: HttpCode.OK, data: { contact } }.yellow,
    // )
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: NotFound,
  })
}

export default updatePartOfContact
