Welcome to my contacts app!

First of all you need to download my files, open in your code programm, install all libs by terminal command npm install.

Now you must create .env with your data to mongoDb:
DB_HOST=mongodb+srv://YOUR_LOGIN:YOUR_PASSWORD@cluster0.9yhbgdk.mongodb.net/db-contacts
and secret to encrypt passwords:
SECRET=YOUR_SECRET_PASSWORD

My app default is working on localhost:3000/

If you are new, firstly register on route:
/api/users/signup
by using json {"email": "YOUR_EMAIL", "password": "YOUR_PASSWORD"}

If you have used my app and got account, login on route:
/api/users/login
by using json {"email": "YOUR_EMAIL", "password": "YOUR_PASSWORD"}

Then you will have acces to contacts saved in your mongoDb.

Helpfull links:

POST /users/signup - will register user

POST /users/login - will login user

GET /users/current - will show current logged in user

POST /users/logout - will logout user (delete token)

PATCH /users/ - will change user subscription

GET /contacts - will get all contacts

GET /contacts?favorite=false&page=2&limit=10 - will get all contacts with favorite filter set on true and pagination (favorite = false, page = 2 and limit per page = 10). Default limit is 10 per page.

GET /contacts/:contactId - will get contact with contactId

POST /contacts - will create contact

PUT /contacts/:contactId - will update contact with contactId

<!-- TODO: describe more? -->

PATCH /contacts/:contactId/favorite - will update your favourite status in contact with contactId

DELETE /contacts/:contactId - will remove contact with :contactId

<!-- TODO: exapmles of links?  -->
