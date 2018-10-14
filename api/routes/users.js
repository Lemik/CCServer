const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user');

router.post('/siginup', controllers.post_signIn);
router.post('/login', controllers.post_login);
router.delete('/:userId', controllers.delete);

module.exports = router;