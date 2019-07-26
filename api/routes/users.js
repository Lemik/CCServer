const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');

router.post('/siginup', controller.post_signIn);
router.post('/login', controller.post_login);

router.get('/', controller.get_all);
router.delete('/:userId', controller.delete);

module.exports = router;