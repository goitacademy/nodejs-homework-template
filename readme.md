# REST API with Node.js.

Implementing RESTful application on Node.js. At the current stage, we will complete express framework and configure basic routes.

## Screenshots from the Postman app, which shows the works of typical CRUD queries of our application.

# Get contact list

@ GET /api/contacts.

https://ibb.co/C28C5TL
![App Screenshot](https://i.ibb.co/ZmX46k9/get-contacts.jpg)

# Get a contact by id

@ GET /api/contacts/:id

https://ibb.co/pxn6k5P
![App Screenshot](https://i.ibb.co/zrNWtD5/get-contact-by-ID.jpg)

# Add contact

@ POST /api/contacts

successful

https://ibb.co/bg1qJNd
![App Screenshot](https://i.ibb.co/xShPHz5/add-contact.jpg)

validation error

https://ibb.co/K0zvpYD
![App Screenshot](https://i.ibb.co/Qbjw3Zk/add-contact-valid.jpg)

empty fields

https://ibb.co/HP0m0LG
![App Screenshot](https://i.ibb.co/VCdXd0M/add-contact-valid-empty.jpg)

# Remove contact

@ DELETE /api/contacts/:id

response after successful deleting

https://ibb.co/mcSfrb1
![App Screenshot](https://i.ibb.co/jrHn9bB/delete-contact.jpg)

contact list after deleting contact with id 2

https://ibb.co/6rgtc74
![App Screenshot](https://i.ibb.co/bQzvjMr/delete-contact-new-List.jpg)

# Update contact

@ PUT /api/contacts/:id

successful

https://ibb.co/px2cSKS
![App Screenshot](https://i.ibb.co/wRyVfQf/update-contact.jpg)

fields validation error

https://ibb.co/hgtWj7j
![App Screenshot](https://i.ibb.co/Gdb2LxL/update-contact-valid.jpg)

all fields are empty

https://ibb.co/xJmpvMy
![App Screenshot](https://i.ibb.co/NZ18hLX/update-contact-valid-empty.jpg)

## Author

- [@MykolaTymoshchuk](https://github.com/Nikolay-Tymoshchuk)
