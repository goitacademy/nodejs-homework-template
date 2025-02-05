### GoIT Node.js Course Template Homework

Fork this repository to complete homework assignments (2-6). The fork will create a repository on your account at http://github.com.

Add your mentor as a collaborator.

For each homework assignment, create a new branch:

- hw02
- hw03
- hw04
- hw05
- hw06

Each new branch for an assignment should be created from the master branch.

Once you have completed a homework assignment on your branch, create a pull request (PR). Then, add your mentor for a code review. Only after your PR is approved by your mentor, you can merge the branch with the homework assignment into the master branch.

Read your mentor's comments carefully. Make the necessary corrections and commit the changes to the homework branch. The changes will automatically appear in the PR once you push the updated code to GitHub. After making corrections, re-add your mentor for a code review.

- When submitting a homework assignment, provide a link to the PR.
- The JavaScript code should be readable and understandable, and Prettier should be used for formatting.

### Commands:

`npm start` — runs the server in production mode.
`npm run start:dev` — runs the server in development mode.
`npm run lint` — runs ESLint to check the code; this should be done before each PR, and all linter errors should be fixed.
`npm run lint:fix` — does the same as above but also automatically fixes simple errors.

Once started, the API endpoints are available at http://localhost:3000/api/auth or http://localhost:3000/api/contacts.

### Available API Endpoints:

`auth`:

`GET /current` - returns the currently logged-in user.
`GET /verify/<verificationToken>` - verifies the user based on the verification token received via email or stored in the database.
`POST /verify` - resends the verification email if the user has not been verified yet.
`POST /signup` - registers a new user in the database.
`POST /login` - logs the user in.
`POST /logout` - logs the user out.
`PATCH /update` - updates user data.
`PATCH /avatars` - allows the user to change their avatar.

`contacts`:

`GET /` - returns the user's contact list.
`GET /<id>` - returns information about a specific contact.
`POST /` - adds a new contact to the user's list.
`DELETE /<id>` - deletes a specific contact.
`PUT /<id>` - updates a specific contact.
`PATCH /<id>/favorite` - toggles the "Favorite" status of a specific contact.
