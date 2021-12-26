import { removeContact } from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
import { Deleted, NotFound } from '../../lib/messages'
// import { colors } from '../../helpers'

const deleteContactContr = async (req, res, next) => {
  const { id } = req.params
  const contact = await removeContact(id)
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, message: Deleted })
    // .json({ status: 'success', code: HttpCode.OK, message: Deleted }.yellow)
  }
  res.status(HttpCode.NOT_FOUND).json(
    {
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: NotFound,
    }.red,
  )
}
export default deleteContactContr
