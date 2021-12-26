import { getContactById } from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
import { NotFound } from '../../lib/messages'
// import { colors } from '../../helpers'

const contactByIdContr = async (req, res, next) => {
  const { id } = req.params
  const contact = await getContactById(id)
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contact } })
  }
  res.status(HttpCode.NOT_FOUND).json(
    {
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: NotFound,
    }.red,
  )
}
export default contactByIdContr
