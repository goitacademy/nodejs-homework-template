### Contacts API

The Contacts API is a Node.js project that provides a set of API endpoints for user registration, login, and management of contacts. It allows users to register an account, authenticate themselves, and perform various actions on their contacts, such as adding, deleting, and updating them.

## Features

1. User Registration: Users can create a new account by providing their details and securely registering their credentials.
2. User Login: Users can log in to the API using their registered credentials, obtaining an authentication token for subsequent API requests.
3. Contact Management: Authenticated users can manage their contacts by adding, deleting, and updating them as needed.
4. Password Hashing: User passwords are securely hashed using the bcrypt library to ensure data security.
5. Cross-Origin Resource Sharing (CORS): The API is configured to allow requests from different domains or origins using the cors library.
6. Environment Configuration: The dotenv library is used to load environment variables from a .env file, facilitating easy configuration of sensitive information.
7. Image Processing: The jimp library provides image processing capabilities, allowing the API to handle and manipulate images associated with user.
8. Schema Validation: User input is validated using the joi library, ensuring data integrity and correctness.
9. JSON Web Tokens (JWT): The API utilizes JSON Web Tokens for user authentication and authorization purposes using the jsonwebtoken library.
10. MongoDB Integration: The mongoose library provides a convenient interface for working with MongoDB, allowing seamless interaction with user and contact data.
11. Logging: HTTP request and response logging is implemented using the morgan middleware, aiding in debugging and monitoring the API. File Uploads: The multer middleware is used to handle multipart/form-data, enabling file uploads such as contact avatars.
12. Unique Identifiers: The nanoid library generates unique IDs for contacts, ensuring uniqueness and avoiding collisions.
13. Email Sending: The nodemailer library is utilized to send emails from the API, enabling functionalities like verification emails or notifications. Installation To set up the Contacts API locally, follow these steps:

## ## Usage

1. Clone this repository to your local machine using git clone https://github.com/haber-viacheslav/contactsApi.git.
2. Navigate to the project directory using cd contactsApi.
3. Install the necessary dependencies using npm install.
4. Set up the required environment variables by creating a .env file based on the provided .env.example file.
5. Start the API server using npm start for production or npm run start:dev for development.
6. The API will be accessible at http://localhost:3000 where 3000 is the specified port number.
7. Usage Once the Contacts API server is running, you can make HTTP requests to the provided endpoints to interact with the API.
