# GoIT/Node.js REST API Project

## Overview
I'm learning Node.js currently, and in this project I'm using my new knowledge to create my first REST API. The REST API can help you to manage your Contacts base, get, add, update, and remove contacts. It is built with the help of Node.js, Express, MongoDB, and Mongoose. 
Authentification was addded with the help of jsonwebtoken and bcryptjs. Only registered and logged in users can view and manage their contacts. 
Pagination and filter by favorite was added with the help of mongoose.

More info will be added with upcoming home works.
Feel free to check it!

## Main Routes:

CONTACTS:
- router.get('/api/contacts') - to list all contacts in the database;
- router.get('/api/contacts/:contactId') - to get a contact by specific Id;
- router.post('/api/contacts') - to add a new contact to the database;
- router.delete('/api/contacts/:contactId') - to remove a contact by Id from the database;
- router.put('/api/contacts/:contactId') - to update a contact (all object or a specific field, at least one field is required);
- router.patch('/api/contacts/:contactId/favorite') - to set a new status for the favorite field (true or false).

USERS:
- router.post('/api/users/signup') - for registration;
- router.post('/api/users/login') - for login;
- router.get('/api/users/logout') - for logout
- router.get('/api/users/current')- to get current logged in user;
- router.patch('/api/users/:userId/subscription')- to update subscription.

### New Contact Example:

```ruby
{
  "_id": "615df854f9946a2e81eb79a6",
  "name": "Nica Test",
  "email": "nica@mail.com",
  "favorite": false
}
```
