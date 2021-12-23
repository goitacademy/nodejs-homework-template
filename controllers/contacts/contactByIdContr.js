import { getContactById } from '../../model/contacts'

const contactByIdContr = async (req, res, next) => {
  const { id } = req.params
  const contact = await getContactById(id)
  if (contact) {
    return res.status(200).json(contact)
  }
  res.status(404).json({ message: `Contact by id ${id} not found` })
}
export default contactByIdContr
