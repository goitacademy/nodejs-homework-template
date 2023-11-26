const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/events', eventsController.createEvent);

router.get('/events', eventsController.getAllEvents);

router.get('/events/:id', eventsController.getEventById);

router.patch('/events/:id', eventsController.updateEvent);

// Удаление события по ID
router.delete('/events/:id', eventsController.deleteEvent);

module.exports = router;
