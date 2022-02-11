function serializeContact(contact) {
    return {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.email,
    };
}


exports.serializeContactResponse = (contact) => ({contact: serializeContact(contact)})

exports.serializeContactsListResponse = (contacts) => ({contacts: contacts.map(serializeContact)})
