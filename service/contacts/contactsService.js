const { repositoryContacts } = require('../../repository');

class ContactsService {
  async isUserExist(userId, email) {
    const user = await repositoryContacts.findByContactEmail(userId, email);
    return !!user;
  }
}
module.exports = new ContactsService();
