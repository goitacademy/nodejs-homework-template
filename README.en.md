Users:
Register user: POST /api/users/signup
Login user: POST /api/users/Login
Logout user: GET /api/users/logout
Current user informations: GET /api/users/current
Contacts:
Get all user's contacts GET /api/contacts
Get contact by id GET /api/contacts/{id}
Create new contact POST /api/contacts
Update contact by id PUT /api/contacts/{id}
Updates status favorite in contact by id PATCH /api/contacts/{id}/favorite
Delete contact by id DELETE /api/contacts/{id}
