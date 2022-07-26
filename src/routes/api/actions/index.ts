'use strict'
import getContacts from "./getContacts"
import getContactById from "./getContactById"
import postContact from "./postContact"
import deleteContactById from "./deleteContactById"
import putContactById from "./putContactById"

const actions = {
    getContacts,
    getContactById,
    postContact,
    deleteContactById,
    putContactById,
}

export default actions;