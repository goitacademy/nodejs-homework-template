/** TAGS
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: API для автентифікації та реєстрації користувачів
 * 
 *   - name: ?????
 *     description: ?????
 */


/** SCHEMAS:
 * @swagger
 * components:
 *   schemas:
 *     userSignupScheme:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Alvaro Capibara
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *           example: qwerty123
 *       required:
 *         - email
 *         - password
 * 
 *     userSigninScheme:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           example: qwerty123
 *       required:
 *         - email
 *         - password
 * 
 *     userEmailScheme:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *       required:
 *         - email
 * 
 * 
 * 
 *   securitySchemes:
 *     Bearer:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/** SIGNUP
 * @swagger
 * /api/users/signup:
 *   post:
 *     tags: [Authentication]
 *     summary: "User signup"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSignupScheme'
 *     responses:
 *       201:
 *         description: Registration success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *             example:
 *               email: AlvaroCapibara@hub.com
 *               name: Alvaro Capibara
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       409:
 *         description: Provided email already exists
 *         content: {}
 */

/** SIGNIN
 * @swagger
 * /api/users/signin:
 *   post:
 *     tags: [Authentication]
 *     summary: "User signin"
 *     description: Вхід зареєстрованого користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSigninScheme'
 *     responses:
 *       200:
 *         description: Успішний вхід
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     subscription:
 *                       type: string
 *             example:
 *               token: "your_generated_token"
 *               user:
 *                 email: "user@example.com"
 *                 subscription: "starter"
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Email doesn't exist / Password is wrong
 *         content: {}
 */

/** SIGNOUT
 * @swagger
 * /api/users/signout:
 *   post:
 *     tags: [Authentication]
 *     summary: "User signout"
 *     description: Вихід з системи користувача
 *     security:
 *       - Bearer: []
 *     responses:
 *       204:
 *         description: Successful operation
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Invalid user / Invalid session
 *         content: {}
 */

/** CURRENT
 * @swagger
 * /api/users/current:
 *   get:
 *     tags: [Authentication]
 *     summary: "Get current user"
 *     description: Отримання інформації про поточного користувача
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Current user success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 subscription:
 *                   type: string
 *             example:
 *               email: "user@example.com"
 *               subscription: "starter"
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 */

/** AVATAR
 * @swagger
 * /api/users/avatar:
 *   patch:
 *     tags: [Authentication]
 *     summary: "Update user avatar"
 *     description: Оновлення аватара користувача
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarURL:
 *                   type: string
 *             example:
 *               avatarURL: "/avatars/new_avatar.jpg"
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 */

/**VERIFY
 * @swagger
 * /api/users/verify/{verificationToken}:
 *   get:
 *     tags: [Authentication]
 *     summary: "Verify user"
 *     description: Підтвердження електронної пошти користувача за допомогою токена верифікації
 *     parameters:
 *       - name: verification token
 *         in: path
 *         description: TOKEN
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Verification successful"
 *       404:
 *         description: User not found
 *         content: {}
 */

/**RESEND VERIFY
 * @swagger
 * /api/users/auth/verify:
 *   post:
 *     tags: [Authentication]
 *     summary: "Resend verification email"
 *     description: Повторне відправлення листа для підтвердження електронної пошти
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userEmailScheme'
 *     responses:
 *       200:
 *         description: Verification email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Verification email sent"
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       404:
 *         description: User not found
 *         content: {}
 */