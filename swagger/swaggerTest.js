/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: API для автентифікації та реєстрації користувачів
 *   - name: Contacts
 *     description: API для роботи з контактами
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     userSignupSchema:
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
 */


/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [Authentication]
 *     summary: "User registration"
 *     description: Реєстрація нового користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSignupSchema'
 *     responses:
 *       201:
 *         description: Успішна реєстрація
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
 *         description: Невірний запит (невірне тіло запиту)
 *       409:
 *         description: Переданий електронний лист вже існує
 */
