const express = require('express');
const router = express.Router();

const controller = require('../controllers/coins')

router.get('/',controller.coins_get_all);
router.get('/:coinId', controller.coins_get1);

router.post('/', controller.coins_post1);

router.patch('/:coinId', controller.coins_patch);

router.delete('/:coinId', controller.coint_delete);

module.exports = router;