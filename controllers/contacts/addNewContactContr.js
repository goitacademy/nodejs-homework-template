import { addContact } from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
// import { colors } from '../../helpers'

const addNewContactContr = async (req, res, next) => {
  const contact = await addContact(req.body)
  res
    .status(HttpCode.CREATED)
    .json({ status: 'success', code: HttpCode.CREATED, data: { contact } })
  // .json({ status: 'success', code: HttpCode.CREATED, data: { contact } }.red)
}
export default addNewContactContr
