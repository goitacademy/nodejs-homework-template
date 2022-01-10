import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'

export const removeContact = async (req, res, next) => {
    const {id} = req.params
    const {id: userId} = req.user
    const contact = await repositoryContacts.removeContact(userId, id)
     if (contact) {
       return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data: {contact},message: "Contact deleted" })
      }
      res.status(HttpCode.NOT_FOUND).json({status: 'error', code: HttpCode.NOT_FOUND, message: `Couldn't delete contact with id: ${id}, because it's NOT FOUND` })
}
