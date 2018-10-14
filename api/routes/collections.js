const express = require('express');
const router = express.Router();
const controller = require('../controllers/collections');

router.get('/',controller.get_all);
router.get('/:collectionId', controller.get_1);
router.post('/',controller.postCollection);
router.patch('/:collectionId', controller.patch_collection);
router.delete('/:collectionId', controller.delete_collection);

module.exports = router;