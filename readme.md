#### Base URL
https://phonebook-zwbk.onrender.com
-----
#### Endpoints and methods

## GET /api/contacts/
Returns list of all the contacts
-----
## GET /api/contacts/{id}/
Returns contact by ID

## POST /api/contacts/
Adds new contact
Returns new contact

An example of a contact object to be added to the DB:
{
    "name": "Olha Toy",
    "email": "olha@email.com",
    "phone": "025-698-45-69",
}


## PUT /api/contacts/{id}/
Find contact by ID and updates it.

An example of a contact object to be added to the DB:
{
    "name": "Allen Raymonds",
    "email": "nulla.ante@vestibul.co.ua",
    "phone": "(992) 914-3792",
    "favorite": true
}

## PATCH /api/contacts/{id}/favorite/
Find contact by ID and updates object property favorite.

An example of a contact object to be added to the DB:
{
    "favorite": true
}
## DELETE /api/contacts/{id}/
Find contact by ID and delete

