import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'

export const addContact = async (req, res, next) => {
    const {id: userId} = req.user
    const newContact = await repositoryContacts.addContact(userId, req.body)
    res.status(HttpCode.CREATED).json({status: 'success', code: HttpCode.OK, data: {contact: newContact} })
}
